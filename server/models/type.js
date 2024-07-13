const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
  _id: { type: Number, unique: true, required: true },
  name: { type: String, require: true },
  unit: { type: String, require: true },
  precision: { type: Number, require: true },
});

module.exports = mongoose.model("Type", typeSchema);
