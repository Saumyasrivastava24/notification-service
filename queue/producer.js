// queue/producer.js
const amqp = require("amqplib");
const queueName = "notifications";

let channel;

const connect = async () => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await conn.createChannel();
  await channel.assertQueue(queueName);
};

connect();

exports.pushToQueue = async (notification) => {
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(notification)));
};
