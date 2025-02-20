const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Note = require("./../models/todoModel");

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://anas_mufti:anas123123@cluster0.jht2l.mongodb.net/anas_mufti"
  )
  .then(function () {
    console.log("Database is connected");

    app.get("/read", async (req, res) => {
      var notes = await Note.find();
      res.send(notes);
    });

    app.get("/read/:userId", async (req, res) => {
      var notes = await Note.find({ userid: req.params.userId });
      res.json(notes);
    });

    app.get("/addNote", async (req, res) => {
      const newData = Note({
        id: req.body.id,
        userid: req.body.userid,
        title: req.body.title,
        content: req.body.content,
      });

      await newData.save();

      const response = { mongoose: "Data added successfully" };
      res.json(response);
    });
  });

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
