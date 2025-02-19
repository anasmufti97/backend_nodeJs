const express = require("express");
const app = express();

const userModel = require("./models/userModel");
const postModel = require("./models/postModel");

app.get("/", (req, res) => {
  res.send("Hello From post Screen");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    userName: "anas",
    age: 25,
    email: "anasmufti112233@gmail.com",
  });
  res.send(user);
});




app.get("/createPost", async (req, res) => {
  let post = await postModel.create({
    user: "67b5d4f1609f411d90f8cc54",
    postData: "This is a post",
  });

  let user = await userModel.findOne({ _id: "67b5d4f1609f411d90f8cc54" });
  user.post.push(post._id);
  await user.save();

  res.send({ post, user });

});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
