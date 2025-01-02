const axios = require("axios");
const { getAuthToken } = require("../utils/apiClient");
const Order = require("../models/order");

const createOrderAdhoc = async (req, res) => {
  try {
    const {
      order_id,
      order_date,
      pickup_location,
      comment,
      channel_id,
      billing_customer_name,
      billing_last_name,
      billing_address,
      billing_address_2,
      billing_city,
      billing_pincode,
      billing_state,
      billing_country,
      billing_email,
      billing_phone,
      shipping_is_billing,
      shipping_customer_name,
      shipping_last_name,
      shipping_address,
      shipping_address_2,
      shipping_city,
      shipping_pincode,
      shipping_country,
      shipping_state,
      shipping_email,
      shipping_phone,
      order_items,
      payment_method,
      shipping_charges,
      giftwrap_charges,
      transaction_charges,
      total_discount,
      sub_total,
      length,
      breadth,
      height,
      weight,
    } = req.body;

    if (shipping_is_billing == false) {
      if (
        !shipping_customer_name ||
        !shipping_last_name ||
        !shipping_address ||
        !shipping_address_2 ||
        !shipping_city ||
        !shipping_country ||
        !shipping_pincode ||
        !shipping_state ||
        !shipping_email ||
        !shipping_charges ||
        !shipping_phone
      ) {
        const message = "Shipping fields are missing.";
        return res.status(400).json({
          error: true,
          message,
        });
      }
    }

    //add logic to check if in request there is a channel id then is the channel id present in database or not

    try {
      const token = await getAuthToken();
      const response = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
        req.body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      const updateOrder = await Order.create({
        order_id: order_id,
        shiprocket_orderId: data.order_id,
        order_date: order_date,
        channel_id,
        pickup_location: pickup_location,
        comment: comment,
        billing_details: {
          customerName: billing_customer_name,
          lastName: billing_last_name,
          address: billing_address,
          address2: billing_address_2,
          city: billing_city,
          pincode: billing_pincode,
          state: billing_state,
          country: billing_country,
          email: billing_email,
          phone: billing_phone,
        },
        order_items: order_items.map((item) => ({
          name: item.name,
          sku: item.sku,
          units: item.units,
          selling_price: item.selling_price,
          discount: item.discount || 0,
          tax: item.tax || 0,
          hsn: item.hsn,
        })),
        shiprocket_details: {
          shipment_id: data.shipment_id,
        },
        dimensions: {
          length: length,
          breadth: breadth,
          height: height,
          weight: weight,
        },
        payment_method: "Prepaid",
        shipping_charges,
        giftwrap_charges,
        transaction_charges,
        total_discount,
        sub_total,
        status: data.status,
        status_code: data.status_code,
      });

      //uncomment this while integrating
      // const updateOrder = await Order.findByIdAndUpdate(order_id, {
      //   shiprocket_orderId: data.order_id,
      //   shiprocketDetails: {
      //     shipment_id: data.shipment_id,
      //   },
      //   status: data.status,
      // });

      // if (!updateOrder) {
      //   return res.status(404).json({ error: true, message: "Order not found" });
      // }

      if (!updateOrder) {
        return res
          .status(404)
          .json({ error: true, message: "Order creation failed" });
      }

      res.status(201).json(response.data);
    } catch (error) {
      console.log("Error ", error);
      return res.status(500).json({ error: true, message: error });
    }

    // example response data : {
    //   order_id: 724848504,
    //   channel_order_id: '1',
    //   shipment_id: 721380960,
    //   status: 'NEW',
    //   status_code: 1,
    //   onboarding_completed_now: 0,
    //   awb_code: '',
    //   courier_company_id: '',
    //   courier_name: '',
    //   new_channel: false
    // }
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const createOrder = async (req, res) => {
  try {
    console.log("Inside Create Order");
    const {
      order_id,
      order_date,
      pickup_location,
      channel_id,
      comment,
      billing_customer_name,
      billing_last_name,
      billing_address,
      billing_address_2,
      billing_city,
      billing_pincode,
      billing_state,
      billing_country,
      billing_email,
      billing_phone,
      shipping_is_billing,
      shipping_customer_name,
      shipping_last_name,
      shipping_address,
      shipping_address_2,
      shipping_city,
      shipping_pincode,
      shipping_country,
      shipping_state,
      shipping_email,
      shipping_phone,
      order_items,
      payment_method,
      shipping_charges,
      giftwrap_charges,
      transaction_charges,
      total_discount,
      sub_total,
      length,
      breadth,
      height,
      weight,
    } = req.body;

    if (
      !order_id ||
      !order_date ||
      !pickup_location ||
      !channel_id ||
      !billing_customer_name ||
      !billing_last_name ||
      !billing_address ||
      !billing_address_2 ||
      !billing_city ||
      !billing_pincode ||
      !billing_state ||
      !billing_country ||
      !billing_email ||
      !billing_phone ||
      !order_items ||
      !payment_method ||
      !length ||
      !breadth ||
      !height ||
      !weight ||
      !sub_total
    ) {
      const message = "Mandatory fields are missing.";
      return res.status(400).json({
        error: true,
        message,
      });
    }

    if (shipping_is_billing == false) {
      if (
        !shipping_customer_name ||
        !shipping_last_name ||
        !shipping_address ||
        !shipping_address_2 ||
        !shipping_city ||
        !shipping_country ||
        !shipping_pincode ||
        !shipping_state ||
        !shipping_email ||
        !shipping_charges ||
        !shipping_phone
      ) {
        const message = "Shipping fields are missing.";
        return res.status(400).json({
          error: true,
          message,
        });
      }
    }

    //add logic to check if the channelId exists or not

    const token = await getAuthToken();
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response inside create order", response);

    //   the response data we get
    //    { "order_id": 724854682,
    //     "channel_order_id": "2",
    //     "shipment_id": 721387138,
    //     "status": "NEW",
    //     "status_code": 1,
    //     "onboarding_completed_now": 0,
    //     "awb_code": "",
    //     "courier_company_id": "",
    //     "courier_name": "",
    //     "new_channel": false,
    //     "packaging_box_error": ""}

    res.status(201).json(response.data);
  } catch (error) {
    console.log("Error creating orders", error);
    return res
      .status(500)
      .json({ error: true, message: error.response.data.message });
  }
};

const updateOrderItems = async (req, res) => {
  /*we can only update the order item details. Could increase/decrease the quantity, update tax/discount, add/remove product items and can also change the nature of the order from a non-document to a document*/
  try {
    const { order_id, orderItems, isDocument } = req.body;

    if (!order_id || !orderItems || isDocument === undefined) {
      return res.status(400).json({
        error: true,
        message: "Mandatory fields are missing.",
      });
    }

    const order = await Order.findOne({ order_id });
    if (!order) {
      return res.status(404).json({
        error: true,
        message: "Order not found.",
      });
    }

    if (order.status_code >= 5) {
      return res.status(400).json({
        error: true,
        message: "Your order has already been picked up. It cannot be updated!",
      });
    }

    const updateOrderData = {
      order_id: order_id,
      order_date: order.order_date,
      shipping_is_billing: true,
      billing_customer_name: order.billing_details.customerName,
      billing_last_name: order.billing_details.lastName,
      billing_address: order.billing_details.address,
      billing_address_2: order.billing_details.address2 || "",
      billing_city: order.billing_details.city,
      billing_state: order.billing_details.state,
      billing_country: order.billing_details.country,
      billing_phone: order.billing_details.phone,
      billing_pincode: order.billing_details.pincode,
      order_items: orderItems.map((item) => ({
        name: item.name,
        sku: item.sku,
        units: item.units,
        selling_price: item.sellingPrice,
        discount: item.discount,
        tax: item.tax,
        hsn: item.hsn,
      })),
      sub_total: order.sub_total,
      payment_method: order.payment_method,
      length: order.dimensions.length,
      breadth: order.dimensions.breadth,
      height: order.dimensions.height,
      weight: order.dimensions.weight,
      is_document: isDocument,
    };

    try {
      const token = await getAuthToken();
      const response = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/orders/update/adhoc",
        updateOrderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response;

      if (data?.success) {
        const updateFinalOrder = await Order.findOneAndUpdate(
          { order_id },
          {
            $set: {
              order_items: orderItems.map((item) => ({
                name: item.name,
                sku: item.sku,
                units: item.units,
                selling_price: item.sellingPrice,
                discount: item.discount || 0,
                tax: item.tax || 0,
                hsn: item.hsn,
              })),
              is_document: isDocument,
            },
          },
          { new: true }
        );

        if (!updateFinalOrder) {
          const message = "Failed to update the order details in the database.";
          return res.status(400).json({
            error: true,
            message,
          });
        }

        res.status(200).json(data);
      } else {
        const message = data?.message || "Order update failed on Shiprocket.";
        res.status(400).json({
          error: true,
          message,
        });
      }
    } catch (error) {
      console.error(
        "Error in updating orders: ",
        error.response?.data || error
      );
      res.status(500).json({
        error: true,
        message: error.response?.data || "Internal Server Error",
      });
    }
  } catch (error) {
    console.error("Error updating orders:", error.response?.data || error);
    res.status(500).json({
      error: true,
      message: error.response?.data || "Internal Server Error",
    });
  }
};

const getOrderDetails = async (req, res, next) => {
  try {
    const token = await getAuthToken();
    const { orderId } = req.params;
    const response = await axios.get(
      `https://apiv2.shiprocket.in/v1/external/orders/show/${orderId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log("Error fetching order details", error);
    next(error);
  }
};

const updatePickupLocation = async (req, res) => {
  try {
    //search until when u can change your pickup location
    const { orderIds, pickup_location } = req.body;

    if (!orderIds || !pickup_location || !Array.isArray(orderIds)) {
      return res.status(400).json({
        error: true,
        message: "Mandatory fields are missing or invalid data type.",
      });
    }

    const order_ids = [];

    for (const orderId of orderIds) {
      const order = await Order.findOne({ order_id: orderId });
      if (!order) {
        return res.status(404).json({
          error: true,
          message: `Order not found with Order Id ${orderId}`,
        });
      }

      order_ids.push(order.shiprocket_orderId); //we have to send shiprocket orderId
    }

    const formData = {
      order_id: order_ids,
      pickup_location,
    };

    try {
      const token = await getAuthToken();
      const response = await axios.patch(
        "https://apiv2.shiprocket.in/v1/external/orders/address/pickup",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response", response.data);

      res.status(200).json(response.data); // Return the response data
    } catch (error) {
      console.log(
        "Failed to update pickup location ",
        error.response?.data || error
      );
      res.status(500).json({
        error: true,
        message: error.response?.data || "Internal Server Error",
      });
    }
  } catch (error) {
    console.error("Error updating orders:", error.response?.data || error);
    res.status(500).json({
      error: true,
      message: error.response?.data || "Internal Server Error",
    });
  }
};

const updateDeliveryAddress = async (req, res) => {
  try {
    //search until when u can change your delivery address location
    const {
      order_id,
      shipping_customer_name,
      shipping_phone,
      shipping_address,
      shipping_address_2,
      shipping_city,
      shipping_state,
      shipping_country,
      shipping_pincode,
    } = req.body;

    if (
      !order_id ||
      !shipping_customer_name ||
      !shipping_phone ||
      !shipping_address ||
      !shipping_city ||
      !shipping_state ||
      !shipping_country ||
      !shipping_pincode
    ) {
      return res.status(400).json({
        error: true,
        message: "Mandatory fields are missing or invalid data type.",
      });
    }

    const order = await Order.findOne({ order_id });
    if (!order) {
      return res.status(404).json({
        error: true,
        message: `Order not found with Order Id ${order_id}`,
      });
    }

    const shiprocket_orderId = order.shiprocket_orderId; //we have to send shiprocket orderId

    const formData = {
      order_id: shiprocket_orderId,
      shipping_customer_name,
      shipping_phone,
      shipping_address,
      shipping_address_2,
      shipping_city,
      shipping_state,
      shipping_country,
      shipping_pincode,
    };

    try {
      const token = await getAuthToken();
      const response = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/orders/address/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedData = await Order.findOneAndUpdate(
        { order_id },
        {
          $set: {
            "shipping_details.isSameAsBilling": false,
            "shipping_details.customerName": shipping_customer_name,
            "shipping_details.lastName": null,
            "shipping_details.address": shipping_address,
            "shipping_details.address2": shipping_address_2,
            "shipping_details.city": shipping_city,
            "shipping_details.pincode": shipping_pincode,
            "shipping_details.state": shipping_state,
            "shipping_details.country": shipping_country,
            "shipping_details.phone": shipping_phone,
          },
        },
        { new: true }
      );

      if (!updatedData) {
        const message = "Failed to update the order details in the database.";
        return res.status(400).json({
          error: true,
          message,
        });
      }

      //we don't get any response

      res.status(200).json("Delivery Address updated successfully");
    } catch (error) {
      console.log(
        "Failed to update delivery address ",
        error.response?.data || error
      );
      res.status(500).json({
        error: true,
        message: error.response?.data || "Failed to update delivery address ",
      });
    }
  } catch (error) {
    console.log("Error updating orders:", error.response?.data || error);
    res.status(500).json({
      error: true,
      message: error.response?.data || "Internal Server Error",
    });
  }
};

module.exports = {
  createOrderAdhoc,
  createOrder,
  updateOrderItems,
  getOrderDetails,
  updatePickupLocation,
  updateDeliveryAddress,
};
