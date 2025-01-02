const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
  {
    shipment_id: { type: String, required: true, unique: true },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Created",
        "Picked Up",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      required: true,
    },
    courier_details: {
      name: { type: String },
      tracking_id: { type: String },
      tracking_url: { type: String },
    },
    pickup_date: { type: Date },
    delivery_date: { type: Date },
    return_details: {
      is_return: { type: Boolean, default: false },
      return_initiated_date: { type: Date },
      return_completed_date: { type: Date },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipment", shipmentSchema);
