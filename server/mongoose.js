const mongoose = require("mongoose");

const Location = require("./models/location");
const Keeper = require("./models/keeper");
const Type = require("./models/type");
const Device = require("./models/device");
const Beehive = require("./models/beehive");
const Data = require("./models/data");
const About = require("./models/about");

const getNextSequenceValue = require("./utils/sequence");

require("dotenv").config(); // Load environment variables

const uri = process.env.MONGO_URI;
const apiKey = process.env.API_KEY;
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

// create location to mongo atlas
const createLocation = async (req, res, next) => {
  try {
    const nextId = await getNextSequenceValue("locationId");
    const createdLocation = new Location({
      _id: nextId,
      name: req.body.name,
      lat: req.body.lat,
      long: req.body.long,
    });

    const result = await createdLocation.save();
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res
        .status(400)
        .json({ error: "Location with the same ID already exists." });
    } else {
      // Handle other errors
      next(error);
    }
  }
};

// update location to mongo atlas
const updateLocation = async (req, res, next) => {
  try {
    const locationId = req.params.id;
    const updatedData = req.body;

    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      updatedData,
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    res.json(updatedLocation);
  } catch (error) {
    next(error);
  }
};

// delete location to mongo atlas
const deleteLocation = async (req, res, next) => {
  try {
    const locationId = req.params.id;
    const deleteLocation = await Location.findByIdAndDelete(locationId);
    if (!deleteLocation) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json({ message: "Location deleted Succesfully" });
  } catch (error) {
    next(error);
  }
};

/* === KEEPERS === */
// get keepers from mongo atlas
const getKeepers = async (req, res, next) => {
  const keepers = await Keeper.find().exec();
  res.json(keepers);
};

// create keeper to mongo atlas
const createKeeper = async (req, res, next) => {
  try {
    const nextId = await getNextSequenceValue("keeperId");
    const createdKeeper = new Keeper({
      _id: nextId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
    });

    const result = await createdKeeper.save();
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res
        .status(400)
        .json({ error: "Keeper with the same ID already exists." });
    } else {
      // Handle other errors
      next(error);
    }
  }
};

// update location to mongo atlas
const updateKeeper = async (req, res, next) => {
  try {
    const keeperId = req.params.id;
    const updatedData = req.body;

    const updatedKeeper = await Keeper.findByIdAndUpdate(
      keeperId,
      updatedData,
      { new: true }
    );

    if (!updatedKeeper) {
      return res.status(404).json({ message: "Keeper not found" });
    }

    res.json(updatedKeeper);
  } catch (error) {
    next(error);
  }
};

// delete location to mongo atlas
const deleteKeeper = async (req, res, next) => {
  try {
    const keeperId = req.params.id;
    const deleteKeeper = await Keeper.findByIdAndDelete(keeperId);
    if (!deleteKeeper) {
      return res.status(404).json({ message: "Keeper not found" });
    }
    res.json({ message: "Keeper deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/* === TYPES === */
// get types from mongo atlas
const getTypes = async (req, res, next) => {
  const types = await Type.find().exec();
  res.json(types);
};

// create type to mongo atlas
const createType = async (req, res, next) => {
  try {
    const nextId = await getNextSequenceValue("typeId");
    const createdType = new Type({
      _id: nextId,
      name: req.body.name,
      unit: req.body.unit,
      precision: req.body.precision,
    });

    const result = await createdType.save();
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ error: "Type with the same ID already exists." });
    } else {
      // Handle other errors
      next(error);
    }
  }
};

// update type to mongo atlas
const updateType = async (req, res, next) => {
  try {
    const TypeId = req.params.id;
    const updatedData = req.body;

    const updatedType = await Type.findByIdAndUpdate(TypeId, updatedData, {
      new: true,
    });

    if (!updatedType) {
      return res.status(404).json({ message: "Type not found" });
    }

    res.json(updatedType);
  } catch (error) {
    next(error);
  }
};

// delete type to mongo atlas
const deleteType = async (req, res, next) => {
  try {
    const typeId = req.params.id;
    const deleteType = await Type.findByIdAndDelete(typeId);
    if (!deleteType) {
      return res.status(404).json({ message: "Type not found" });
    }
    res.json({ message: "Type deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/* === DEVICES === */
// get devices from mongo atlas
const getDevices = async (req, res, next) => {
  const devices = await Device.find().exec();
  res.json(devices);
};

// delete device to mongo atlas
const createDevice = async (req, res, next) => {
  // Generate a random letter
  function getRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  }

  // Example usage
  const randomLetter1 = getRandomLetter();
  const randomLetter2 = getRandomLetter();
  const randomLetter3 = getRandomLetter();
  salt1 = Math.round(Math.random() * 999).toString();
  salt2 = Math.round(Math.random() * 999).toString();

  try {
    const nextId = await getNextSequenceValue("DeviceID");
    const createdDevice = new Device({
      _id: nextId,
      locationId: req.body.locationId,
      typeId: req.body.typeId,
      keeperId: req.body.keeperId,
      address: req.body.address,
      apiKey: randomLetter1 + salt1 + randomLetter2 + salt2 + randomLetter3,
    });

    const result = await createdDevice.save();
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res
        .status(400)
        .json({ error: "Device with the same ID already exists." });
    } else {
      // Handle other errors
      next(error);
    }
  }
};

// update device to mongo atlas
const updateDevice = async (req, res, next) => {
  try {
    const DeviceId = req.params.id;
    const updatedData = req.body;

    const updatedDevice = await Device.findByIdAndUpdate(
      DeviceId,
      updatedData,
      { new: true }
    );

    if (!updatedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.json(updatedDevice);
  } catch (error) {
    next(error);
  }
};

// delete device to mongo atlas
const deleteDevice = async (req, res, next) => {
  try {
    const deviceId = req.params.id;
    const deleteDevice = await Device.findByIdAndDelete(deviceId);
    if (!deleteDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.json({ message: "Device deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/* === BEHIVES === */
// get beehives from mongo atlas
const getBeehive = async (req, res, next) => {
  const beehives = await Beehive.find().exec();
  res.json(beehives);
};

// create behive to mongo atlas
const createBeehive = async (req, res, next) => {
  try {
    const nextId = await getNextSequenceValue("BeehiveID");
    const createdBehive = new Beehive({
      _id: nextId,
      devicesIds: req.body.devicesIds,
    });

    const result = await createdBehive.save();
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res
        .status(400)
        .json({ error: "Beehive with the same ID already exists." });
    } else {
      // Handle other errors
      next(error);
    }
  }
};

// update behive to mongo atlas
const updateBeehive = async (req, res, next) => {
  try {
    const BeehiveId = req.params.id;
    const updatedData = req.body;

    const updatedBeehive = await Beehive.findByIdAndUpdate(
      BeehiveId,
      updatedData,
      { new: true }
    );

    if (!updatedBeehive) {
      return res.status(404).json({ message: "Beehive not found" });
    }

    res.json(updatedBeehive);
  } catch (error) {
    next(error);
  }
};

// delete behive to mongo atlas
const deleteBeehive = async (req, res, next) => {
  try {
    const beehiveId = req.params.id;
    const deletedBeehive = await Beehive.findByIdAndDelete(beehiveId);
    if (!deletedBeehive) {
      return res.status(404).json({ message: "Beehive not found" });
    }
    res.json({ message: "Beehive deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/* === DATA === */
// get data from mongo atlas
const getData = async (req, res, next) => {
  const data = await Data.find().exec();
  res.json(data);
};

// new post data for open api connection :::::
// ????
const createData = async (req, res, next) => {
  // Check if API key is present in the request headers
  const validApiKey = req.headers["api-key"];

  // key for api

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ error: "Unauthorized. Invalid API key." });
  }


  try {
    const nextId = await getNextSequenceValue("DataId");
    const createData = new Data({
      _id: nextId,
      deviceId: req.body.deviceId,
      value: req.body.value,
      timeStamp: req.body.timeStamp,
      registerTimeStamp: req.body.registerTimeStamp,
    });

    const result = await createData.save();
    res.json(result);
  } catch (error) {
    // Duplicate key error
    if (error.code === 11000) {
      res.status(400).json({ error: "Data with the same id already exists." });
    } else {
      // Handle other errors
      next(error);
    }
  }
};


/* === ABOUT === */
// get about data from mongo atlas
const getAbout = async (req, res, next) => {
  const about = await About.find().exec();
  res.json(about);
};

// create about data
const createAbout = async (req, res, next) => {
  try {
    const nextId = await getNextSequenceValue("aboutID");
    const createdAbout = new About({
      _id: nextId,
      title: req.body.title,
      message: req.body.message,
    });

    const result = await createdAbout.save();
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Data with the same id already exists" });
    } else {
      next(error);
    }
  }
};

// update about data
const updateAbout = async (req, res, next) => {
  try {
    const AboutId = req.params.id;
    const updatedData = req.body;

    const updatedAbout = await About.findByIdAndUpdate(AboutId, updatedData, {
      new: true,
    });

    if (!updatedAbout) {
      return res.status(404).json({ message: "About not found" });
    }

    res.json(updatedAbout);
  } catch (error) {
    next(error);
  }
};

// delete update data
const deleteAbout = async (req, res, next) => {
  try {
    const DeleteId = req.params.id;
    const deleteUpdate = await About.findByIdAndDelete(DeleteId);
    if (!deleteUpdate) {
      return res.status(404).json({ message: "Id not found" });
    }
    res.json({ message: "Id deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/* === EXPORTS === */
//locations
exports.getLocations = getLocations;
exports.createLocation = createLocation;
exports.updateLocation = updateLocation;
exports.deleteLocation = deleteLocation;

// keepers
exports.getKeepers = getKeepers;
exports.createKeeper = createKeeper;
exports.updateKeeper = updateKeeper;
exports.deleteKeeper = deleteKeeper;

// types
exports.getTypes = getTypes;
exports.createType = createType;
exports.updateType = updateType;
exports.deleteType = deleteType;

// devices
exports.getDevices = getDevices;
exports.createDevice = createDevice;
exports.updateDevice = updateDevice;
exports.deleteDevice = deleteDevice;

// beehives
exports.getBeehive = getBeehive;
exports.createBeehive = createBeehive;
exports.updateBeehive = updateBeehive;
exports.deleteBeehive = deleteBeehive;

// data
exports.getData = getData;
exports.createData = createData;

// about
exports.getAbout = getAbout;
exports.createAbout = createAbout;
exports.updateAbout = updateAbout;
exports.deleteAbout = deleteAbout;
