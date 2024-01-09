const mongoose = require("mongoose");
const PasswordSchema = require("./PasswordSchema");
const PG_SCHEMA = new mongoose.Schema({
  email: String,
  passwords: { type: [PasswordSchema], required: true },
});

module.exports = mongoose.model("PG", PG_SCHEMA);
