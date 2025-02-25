const express = require("express");
const app = express();
const ngrok = require("ngrok");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Note = require("./../models/todoModel");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Connection
mongoose
  .connect("mongodb+srv://anas_mufti:anas123123@cluster0.jht2l.mongodb.net/anas_mufti")
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

// Routes
app.get("/read", async (req, res) => {
  try {
    const notes = await Note.find();
    res.send(notes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching notes" });
  }
});

app.get("/read/:userId", async (req, res) => {
  try {
    const notes = await Note.find({ userid: req.params.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user notes" });
  }
});

app.post("/addNote", async (req, res) => {
  try {
    const newData = new Note({
      id: req.body.id,
      userid: req.body.userid,
      title: req.body.title,
      content: req.body.content,
    });
    await newData.save();
    res.json({ message: "✅ Data added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding data" });
  }
});

app.post("/delete", async (req, res) => {
  try {
    await Note.deleteOne({ id: req.body.id });
    res.json({ message: "✅ Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting data" });
  }
});

// Server & Ngrok Setup
const PORT = process.env.PORT || 3200;

app.listen(PORT, async () => {
  console.log(`🚀 Local server running at: http://localhost:${PORT}`);

  try {
    // const ngrokUrl = await ngrok.connect(PORT);
    console.log(`🌍 Ngrok tunnel is: ${ngrokUrl}`);
  } catch (error) {
    console.error("❌ Ngrok failed to start:", error);
  }
});


// https://413c-182-185-158-96.ngrok-free.app