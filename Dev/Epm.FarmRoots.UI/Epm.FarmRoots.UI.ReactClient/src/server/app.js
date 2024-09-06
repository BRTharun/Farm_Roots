require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/connect.js");

const app = express();
const router = require("./router");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

(async () => {
  await dbConnect();
  router(app);
  app.use((err, req, res, next) => {
    if (err) {
      console.error("Application error occurred", err);
    }
    next(err);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
