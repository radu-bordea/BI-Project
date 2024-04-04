const mongoose = require("mongoose");

const pictureSchema = mongoose.Schema({
  image: String
});

module.exports = mongoose.model("Picture", pictureSchema);
