const mongoose = require("mongoose");

const Location = require("./models/location");

mongoose
  .connect(
    "mongodb+srv://radu:brn1989@cluster0.37mmycn.mongodb.net/bi-project?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const createLocation = async (req, res, next) => {
  const createdLocation = new Location({
    _id: req.body._id,
    name: req.body.name,
    long: req.body.long,
    lat: req.body.lat,
  });
  console.log(createdLocation);
  const result = await createdLocation.save();
  console.log(typeof createdLocation._id);
  res.json(result);
};

const getLocations = async (req, res, next) => {
  const locations = await Location.find().exec();
  res.json(locations);
};

exports.createLocation = createLocation;
exports.getLocations = getLocations;
