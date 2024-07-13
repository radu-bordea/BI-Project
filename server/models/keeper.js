const mongoose = require("mongoose");

const keeperSchema = mongoose.Schema({
  _id: { type: Number, unique: true, required: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
});

module.exports = mongoose.model("Keeper", keeperSchema);
