const mongoose = require("mongoose");

function connect() {
  return new Promise((res, rej) => {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Database connected successfully");
        res(true);
      })
      .catch((err) => {
        console.log("Database connection error:", err);
        rej(err);
      });
  });
}

module.exports = connect;
