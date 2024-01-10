const express = require("express");
const mongoose = require("mongoose");
const PG = require("./models/PG");
const Connect_DB = require("./DB");
require("dotenv").config();

const {
  getEncryptedEmail,
  getDecryptedPass,
  getEncryptedPassword,
} = require("./controllers/getEncDec.js");

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
  const encEmail = getEncryptedEmail(email);
  await PG.findOne({ email: encEmail })
    .then((data) => {
      res.status(200).json(getDecryptedPass(data));
    })
    .catch((e) => res.status(404).json(e.message));
});

app.post("/add-password", async (req, res) => {
  let { email, password } = req.body;

  const encEmail = getEncryptedEmail(email);
  const encPass = getEncryptedPassword(password);

  console.log("➕ password");

  await PG.updateOne({ email: encEmail }, { $push: { passwords: encPass } })
    .then(async (data) => {
      let rs = data;
      if (!data.modifiedCount) {
        const newDoc = new PG({
          email: encEmail,
          passwords: [encPass],
        });
        await newDoc.save();
        rs = { modifiedCount: 1 };
      }
      res.status(200).json(rs);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(404).json(e);
    });
});

app.listen(PORT, () => {
  console.log("server listening on port 🔥", PORT);
});
