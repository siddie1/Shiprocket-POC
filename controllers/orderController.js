const axios = require("axios");
const { getAuthToken } = require("../utils/apiClient");

const createOrder = async (req, res, next) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      req.body,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.status(201).json(response.data);
  } catch (error) {
    console.log("Error creating orders", error);
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const token = await getAuthToken();
    const { orderId, ...updateData } = req.body;
    const response = await axios.put(
      `https://apiv2.shiprocket.in/v1/external/orders/${orderId}`,
      updateData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log("Error updating orders", error);
    next(error);
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

module.exports = { createOrder, updateOrder, getOrderDetails };
