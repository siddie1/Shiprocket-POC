exports.errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  if (err.response && err.response.status === 401) {
    const { cachedToken, tokenExpiry } = require("../utils/apiClient");
    cachedToken = null;
    tokenExpiry = null;
    return res
      .status(401)
      .json({ error: "Token expired. Please retry the request." });
  }
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
};
