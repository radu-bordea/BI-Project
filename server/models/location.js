const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  _id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
});

module.exports = mongoose.model("Location", locationSchema);
