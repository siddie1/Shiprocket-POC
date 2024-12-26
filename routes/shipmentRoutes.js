const express = require("express");
const { getServiceableCouriers } = require("../controllers/shipmentController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/couriers", protect, getServiceableCouriers);

module.exports = router;
