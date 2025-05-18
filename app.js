const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const notificationRoutes = require("./routes/notificationRoutes");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use("/notifications", notificationRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
