const axios = require("axios");
const { getAuthToken } = require("../utils/apiClient");

const getServiceableCouriers = async (req, res, next) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/courier/serviceability/",
      req.body,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log("Error fetching Courier Options", error);
    next(error);
  }
};

const trackShipment = async (req, res, next) => {
  try {
    const token = await getAuthToken();
    const { shipmentId } = req.params;
    const response = await axios.get(
      `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log("Error tracking shipment details", error);
    next(error);
  }
};

module.exports = { getServiceableCouriers, trackShipment };
