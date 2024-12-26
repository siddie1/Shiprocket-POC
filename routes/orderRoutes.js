const express = require("express");
const { createOrder } = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, createOrder);

module.exports = router;
