const axios = require("axios");

exports.getAuthToken = async (req, res, next) => {
  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }
    );
    res.status(200).json({ token: response.data.token });
  } catch (error) {
    next(error);
  }
};
