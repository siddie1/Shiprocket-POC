const express = require("express");
const {
  createOrder,
  getOrderDetails,
  createOrderAdhoc,
  updateOrderItems,
  updatePickupLocation,
  updateDeliveryAddress,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/createOrderAdhoc", createOrderAdhoc);
router.post("/createOrder", createOrder);
router.post("/updateOrderItems", updateOrderItems);
router.get("/:orderId", getOrderDetails);
router.patch("/updatePickupLocation", updatePickupLocation);
router.post("/updateDeliveryAddress", updateDeliveryAddress);

module.exports = router;
