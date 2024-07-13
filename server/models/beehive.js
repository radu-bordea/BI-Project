const mongoose = require("mongoose");

const beehiveSchema = mongoose.Schema({
  _id: { type: Number, unique: true, required: true },
  devicesIds: { type: String, require: true },
});

module.exports = mongoose.model("Behive", beehiveSchema);
