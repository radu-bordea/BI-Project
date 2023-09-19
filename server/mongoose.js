const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const uri = process.env.MONGO_URI;

const Location = require("./models/location");
const Keeper = require("./models/keeper");
const Type = require("./models/type");
const Device = require("./models/device");
const Behive = require("./models/behive");
const Data = require("./models/data");

// connect to mongo atlas bi database
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
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
    location: req.body.location,
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

/* === TYPES === */
// get types from mongo atlas
const getTypes = async (req, res, next) => {
  const types = await Type.find().exec();
  res.json(types);
};

// post type to mongo atlas
const createType = async (req, res, next) => {
  const createdType = new Type({
    _id: req.body._id,
    name: req.body.name,
    unit: req.body.unit,
    precision: req.body.precision,
  });
  console.log(createdType);
  const result = await createdType.save();
  res.json(result);
};

/* === DEVICES === */
// get devices from mongo atlas
const getDevices = async (req, res, next) => {
  const devices = await Device.find().exec();
  res.json(devices);
};

// post device to mongo atlas
const createDevice = async (req, res, next) => {
  const createdDevice = new Device({
    _id: req.body._id,
    locationId: req.body.locationId,
    typeId: req.body.typeId,
    keeperId: req.body.keeperId,
    address: req.body.address,
  });
  console.log(createdDevice);
  const resut = await createdDevice.save();
  res.json(resut);
};

/* === BEHIVES === */
// get behives from mongo atlas
const getBehives = async (req, res, next) => {
  const behives = await Behive.find().exec();
  res.json(behives);
};

// post behive to mongo atlas
const createBehive = async (req, res, next) => {
  const createdBehive = new Behive({
    _id: req.body._id,
    deviceId: req.body.deviceId,
  });
  console.log(createdBehive);
  const resut = await createdBehive.save();
  res.json(resut);
};

/* === DEVICES === */
// get data from mongo atlas
const getData = async (req, res, next) => {
  const data = await Data.find().exec();
  res.json(data);
};

// post data to mongo atlas
const createData = async (req, res, next) => {
  const createdData = new Data({
    _id: req.body._id,
    deviceId: req.body.deviceId,
    value: req.body.value,
    timeStamp: req.body.timeStamp,
    registerTimeStamp: req.body.registerTimeStamp,
  });
  console.log(createdData);
  const resut = await createdData.save();
  res.json(resut);
};

/* === EXPORTS === */
//locations
exports.getLocations = getLocations;
exports.createLocation = createLocation;

// keepers
exports.getKeepers = getKeepers;
exports.createKeeper = createKeeper;

// types
exports.getTypes = getTypes;
exports.createType = createType;

// devices
exports.getDevices = getDevices;
exports.createDevice = createDevice;

// behives
exports.getBehives = getBehives;
exports.createBehive = createBehive;

// data
exports.getData = getData;
exports.createData = createData;
