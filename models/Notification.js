// models/Notification.js
const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  userId: String,
  type: { type: String, enum: ["email", "sms", "in-app"] },
  message: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", NotificationSchema);
