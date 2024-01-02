const mongoose = require("mongoose");

const PG_SCHEMA = new mongoose.Schema({
  email: { type: String },
  passwords: { type: Array },
});

module.exports = mongoose.model("PG", PG_SCHEMA);
