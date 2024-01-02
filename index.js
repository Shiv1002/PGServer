const express = require("express");
const mongoose = require("mongoose");
const PG = require("./models/PG");
const Connect_DB = require("./DB");
const app = express();
const PORT = process.env.PORT || 1212;

Connect_DB();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.json("This is PG server");
});

app.post("/get-password", async (req, res) => {
  const { email } = req.body;
  await PG.findOne({ email: email })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => res.status(404).json(e.message));
});

app.post("/add-password", async (req, res) => {
  const { email, password } = req.body;
  console.log("➕ password");
  await PG.updateOne({ email: email }, { $push: { passwords: password } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(404).json(e);
    });
});

app.listen(PORT, () => {
  console.log("server listening on port 🔥", PORT);
});
