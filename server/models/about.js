const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema({
  _id: { type: String, require: true },
  title: { type: String, require: true },
  message: { type: String, require: true },
});

module.exports = mongoose.model("About", aboutSchema);
