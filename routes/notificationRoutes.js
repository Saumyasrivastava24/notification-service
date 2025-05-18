// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const {
  sendNotification,
  getUserNotifications,
} = require("../controllers/notificationController");

router.post("/", sendNotification);
router.get("/:userId", getUserNotifications);

module.exports = router;


