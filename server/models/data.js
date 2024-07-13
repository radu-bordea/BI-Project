const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  _id: { type: Number, unique: true, required: true },
  deviceId: { type: String, required: true },
  value: { type: Decimal128, required: true },
  timeStamp: { type: Date, required: true },
  registerTimeStamp: { type: Date, required: true },
});

module.exports = mongoose.model("Data", dataSchema);
