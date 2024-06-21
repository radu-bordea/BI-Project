const mongoose = require("mongoose");

const behiveSchema = mongoose.Schema({
  _id: { type: String, require: true },
  devicesIds: { type: String, require: true },
});

module.exports = mongoose.model("Behive", behiveSchema);
