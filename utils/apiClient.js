//logic will change according to the complexity of requirement

const axios = require("axios");

let cachedToken = null;
let tokenExpiry = null;

async function getAuthToken() {
  if (cachedToken && tokenExpiry && new Date() < tokenExpiry) {
    return cachedToken;
  }

  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_API_USER,
        password: process.env.SHIPROCKET_API_PASSWORD,
      }
    );

    cachedToken = response.data.token;
    tokenExpiry = new Date(Date.now() + 8 * 24 * 60 * 60 * 1000); //8 days expiry

    return cachedToken;
  } catch (error) {
    console.log("Error fetching Shiprocket token:", error.message);
    throw new Error("Failed to authenticate with Shiprocket");
  }
}

module.exports = { getAuthToken };
