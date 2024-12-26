const axios = require("axios");
const { getAuthToken } = require("../utils/apiClient");

exports.getServiceableCouriers = async (req, res, next) => {
  try {
    const token = await getAuthToken();
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/courier/serviceability/",
      req.body,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};
