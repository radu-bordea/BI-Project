const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
  _id: { type: Number, unique: true, required: true },
  locationId: { type: String, require },
  typeId: { type: String, require },
  keeperId: { type: String, require },
  address: {type: String, require: true},
  apiKey: {type: String, require: true}
});

module.exports = mongoose.model("Device", deviceSchema);
