const mongoose = require("mongoose");

const connection = async function () {
  await mongoose.connect("mongodb://localhost:27017/newdb");
};

module.exports = connection;
