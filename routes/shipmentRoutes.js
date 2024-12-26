const express = require("express");
const {
  getServiceableCouriers,
  trackShipment,
} = require("../controllers/shipmentController");
const router = express.Router();

router.post("/couriers", getServiceableCouriers);
router.get("/track/:shipmentId", trackShipment);

module.exports = router;
