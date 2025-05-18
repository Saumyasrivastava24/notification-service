// queue/consumer.js
const amqp = require("amqplib");
const mongoose = require("mongoose");
const Notification = require("../models/Notification");
const { processNotification } = require("../services/notifier");
require("dotenv").config();

const queueName = "notifications";

const startConsumer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Consumer connected to MongoDB");

    // Connect to RabbitMQ
    const conn = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue(queueName);
    console.log(
      `✅ Consumer connected to RabbitMQ and waiting for messages in '${queueName}'`
    );

    channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        const notification = JSON.parse(msg.content.toString());
        try {
          await processNotification(notification);
          await Notification.findByIdAndUpdate(notification._id, {
            status: "sent",
          });
          console.log(
            `📨 Processed notification for ${notification.userId}: ${notification.message}`
          );
          channel.ack(msg);
        } catch (err) {
          console.error("❌ Notification failed, retry later:", err.message);
          channel.nack(msg); // for retry
        }
      }
    });
  } catch (error) {
    console.error("❌ Consumer setup error:", error.message);
  }
};

startConsumer();
