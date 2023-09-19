const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  location: { 
    lat: {type: Number, required: true},
    long: {type: Number, required: true}
   },
});

module.exports = mongoose.model("Location", locationSchema);