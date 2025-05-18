// services/notifier.js

exports.processNotification = async (notification) => {
  if (notification.type === "email") {
    await sendEmail(notification);
  } else if (notification.type === "sms") {
    console.log("📱 [SMS] Message:", notification.message);
  } else if (notification.type === "in-app") {
    console.log("💬 [In-App] Notification stored.");
  }
};

const sendEmail = async (notification) => {
  console.log("📧 [Mock Email Sent]");
  console.log("To:", notification.email || "user@example.com");
  console.log("Subject:", "Notification");
  console.log("Message:", notification.message);
};
