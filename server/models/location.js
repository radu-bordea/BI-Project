const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  _id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
});

module.exports = mongoose.model("Location", locationSchema);
