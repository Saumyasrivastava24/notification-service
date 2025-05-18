// controllers/notificationController.js
const Notification = require("../models/Notification");
const { pushToQueue } = require("../queue/producer");

exports.sendNotification = async (req, res) => {
  const { userId, type, message } = req.body;
  try {
    const notification = await Notification.create({ userId, type, message });
    await pushToQueue(notification);
    res.status(201).json({ success: true, id: notification._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ userId });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
