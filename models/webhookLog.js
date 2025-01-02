const mongoose = require("mongoose");

const webhookEventSchema = new mongoose.Schema(
  {
    event: { type: String, required: true },
    payload: { type: Object, required: true }, // Complete webhook payload
    processed: { type: Boolean, default: false }, // Mark as processed after handling
  },
  { timestamps: true }
);

module.exports = mongoose.model("WebhookEvent", webhookEventSchema);
