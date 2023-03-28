//Use dotenv to read .env vars into Node
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const User = require("./models/Users");

// connection to MongoDB
connectDB();
// Cors
app.use(cors(corsOptions));
// built-in middleware to handle urlencoded data
// require if needed to access that form data using req.body
// app.use(express.urlencoded({ extended: false }));

// built-in middleware for JSON
app.use(express.json());

// API methods
// GET
app.get("/users", (_, res) => {
  User.find({}).then((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// GET by ID
app.get("/users/:id", async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "User id required." });
  }

  const user = await User.findOne({ _id: req.params.id }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `There is no user with ID ${req.params.id}` });
  }

  res.json(user);
});

// POST
app.post("/users", async (req, res) => {
  if (!req?.body?.name || !req?.body?.age || !req?.body?.username) {
    return res
      .status(400)
      .json({ message: "Name, age and username are required." });
  }
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.log(err);
  }
});

// PUT
app.put("/users", async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "User id is required" });
  }

  const user = await User.findOne({ _id: req.body.id }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.body.id}` });
  }

  if (req.body?.name) user.name = req.body.name;
  if (req.body?.age) user.age = req.body.age;
  if (req.body?.username) user.username = req.body.username;

  try {
    await user.save();
    res.json({ message: "User was updated successfully" });
  } catch (err) {
    console.log(err);
  }
});

// DELETE
app.delete("/users", async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "User id required." });
  }

  const user = await User.findOne({ _id: req.body.id }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `There is no user with ID ${req.body.id}` });
  }

  try {
    await user.deleteOne({ _id: req.body.id });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
  }
});

// Only listen if MongoDB connection is ok
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
