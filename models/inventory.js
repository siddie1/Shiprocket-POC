const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true }, // Your product ID
    sku: { type: String, required: true },
    name: { type: String, required: true },
    stock: { type: Number, required: true },
    lowStockAlert: { type: Number, default: 10 },
    price: { type: Number, required: true },
    hsn: { type: String },
    weight: { type: Number, required: true },
    dimensions: {
      length: { type: Number },
      breadth: { type: Number },
      height: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);

//this part is optional, may need in future
