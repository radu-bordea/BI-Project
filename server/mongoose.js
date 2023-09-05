const mongoose = require("mongoose");

const Location = require("./models/location");
const Keeper = require("./models/keeper");

// connect to mongo atlas bi database
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

/******  MIDDLEWARE ******/

/* === LOCATIONS === */
// get locations from mongo atlas
const getLocations = async (req, res, next) => {
  const locations = await Location.find().exec();
  res.json(locations);
};

// post location to mongo atlas
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

/* === KEEPERS === */
// get keepers from mongo atlas
const getKeepers = async (req, res, next) => {
  const keepers = await Keeper.find().exec();
  res.json(keepers);
};

// post keeper to mongo atlas
const createKeeper = async (req, res, next) => {
  const createdKeeper = new Keeper({
    _id: req.body._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
  });
  console.log(createdKeeper);
  const result = await createdKeeper.save();
  res.json(result);
};

/* === EXPORTS === */
//locations
exports.getLocations = getLocations;
exports.createLocation = createLocation;
// keepers
exports.getKeepers = getKeepers;
exports.createKeeper = createKeeper;
