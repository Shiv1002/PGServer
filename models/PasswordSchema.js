const mongoose = require("mongoose");

const PasswordSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    pass: { type: String, required: true },
    passwordFor: { type: String, required: true },
    timestamp: { type: Date, required: true },
    important: Boolean,
  },
  {
    _id: false,
  }
);

module.exports = PasswordSchema;
