const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  long: { type: Decimal128, required: true },
  lat: { type: Decimal128, required: true },
});

module.exports = mongoose.model("Location", locationSchema);