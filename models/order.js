const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_id: { type: String, required: true, unique: true }, // Your order ID
    shiprocket_orderId: { type: String, unique: true },
    order_date: { type: Date, required: true },
    pickup_location: { type: String, required: true },
    channel_id: { type: String, default: null }, // Optional channel integration
    comment: { type: String },
    billing_details: {
      customerName: { type: String, required: true },
      lastName: { type: String },
      address: { type: String, required: true },
      address2: { type: String },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    shipping_details: {
      isSameAsBilling: { type: Boolean, default: true },
      customerName: { type: String },
      lastName: { type: String },
      address: { type: String },
      address2: { type: String },
      city: { type: String },
      pincode: { type: String },
      state: { type: String },
      country: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    is_document: { type: Number, default: 0 },
    order_items: [
      {
        name: { type: String, required: true },
        sku: { type: String, required: true },
        units: { type: Number, required: true },
        selling_price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        tax: { type: Number, default: 0 },
        hsn: { type: String },
      },
    ],
    payment_method: { type: String, enum: ["Prepaid", "COD"], required: true },
    shipping_charges: { type: Number, default: 0 },
    giftwrap_charges: { type: Number, default: 0 },
    transaction_charges: { type: Number, default: 0 },
    total_discount: { type: Number, default: 0 },
    sub_total: { type: Number, required: true },
    dimensions: {
      length: { type: Number },
      breadth: { type: Number },
      height: { type: Number },
      weight: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: [
        "NEW",
        "Created",
        "Processed",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      default: "Created",
    },
    status_code: { type: Number, default: 0 },
    shiprocket_details: {
      shipment_id: { type: String }, // Shiprocket's shipment ID
      awb_code: { type: String }, // Tracking ID for the courier
      courier_name: { type: String },
      courier_company_id: { type: String }, // Assigned courier
      label_url: { type: String }, // Shipping label URL
      tracking_url: { type: String }, // Tracking URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
