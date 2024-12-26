const express = require("express");
const { getAuthToken } = require("../controllers/authController");
const router = express.Router();

router.post("/token", getAuthToken);

module.exports = router;
