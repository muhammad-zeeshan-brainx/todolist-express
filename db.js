const mongoose = require("mongoose");

const connection = function () {
  return new Promise((resolve, reject) => {
    mongoose
      .connect("mongodb://localhost:27017/newdb")
      .then(() => {
        resolve();
      })
      .catch((error) => {
        error.message = "could not connect to database, the server may be down";
        reject(error);
      });
  });
};

module.exports = { connection };
