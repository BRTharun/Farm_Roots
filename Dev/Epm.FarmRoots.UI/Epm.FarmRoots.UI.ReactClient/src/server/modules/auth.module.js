const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/user.js");
const { createToken } = require("../lib/security/jwt.js");
const authZMiddleware = require("../middlewares/authorization.middleware.js");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        status: "error",
        message: "Another user with the same email exists",
      });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(204).send("ok");
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error has occurred while performing this operation",
      error,
    });
  }
});

// Login Route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }
    const access_token = createToken({ id: user._id });
    res.json({ data: { access_token } });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error has occurred while performing this operation",
      error,
    });
  }
});

router.get("/session", [authZMiddleware], (req, res) => {
  res.json({ data: { user_id: req.user?.id } });
});

module.exports = router;
