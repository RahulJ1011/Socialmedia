const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connection = () => {
  const DB = process.env.MONGO;
  mongoose.connect(DB);
  console.log("mongoose is connected");
};

module.exports = { connection };
