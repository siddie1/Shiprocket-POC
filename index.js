require("dotenv").config({ path: __dirname + "/.env" });
require("./db/connection");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shipments", shipmentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
