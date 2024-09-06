const express = require("express");
const AuthRouter = require("../modules/auth.module");

const DefaultRouter = express.Router();

DefaultRouter.use("/ping", (req, res) => {
  res.json({
    server_time: Date.now(),
  });
});

const init = function (app) {
  app.use("/api", DefaultRouter);
  app.use("/api/auth", AuthRouter);
};

module.exports = init;
