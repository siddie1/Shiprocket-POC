const express = require("express");
const {
  createOrder,
  updateOrder,
  getOrderDetails,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/create", createOrder);
router.put("/update", updateOrder);
router.get("/:orderId", getOrderDetails);

module.exports = router;
