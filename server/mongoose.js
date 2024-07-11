const mongoose = require("mongoose");

const Location = require("./models/location");
const Keeper = require("./models/keeper");
const Type = require("./models/type");
const Device = require("./models/device");
const Behive = require("./models/behive");
const Data = require("./models/data");
const Picture = require("./models/picture");
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
// const getLocations = async (req, res, next) => {
//   try {
//     const locations = await Location.find().sort({ _id: 1 }).exec(); // Sort by _id in ascending order
//     res.json(locations);
//   } catch (error) {
//     next(error); // Pass error to the error handling middleware
//   }
// };
// get locations from mongo atlas

// post location to mongo atlas
const createLocation = async (req, res, next) => {
  const createdLocation = new Location({
    _id: req.body._id,
    name: req.body.name,
    lat: req.body.lat,
    long: req.body.long,
  });

  try {
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

// post keeper to mongo atlas
const createKeeper = async (req, res, next) => {
  const createdKeeper = new Keeper({
    _id: req.body._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
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

// post type to mongo atlas
const createType = async (req, res, next) => {
  const createdType = new Type({
    _id: req.body._id,
    name: req.body.name,
    unit: req.body.unit,
    precision: req.body.precision,
  });

  try {
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

// post device to mongo atlas
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

  const createdDevice = new Device({
    _id: req.body._id,
    locationId: req.body.locationId,
    typeId: req.body.typeId,
    keeperId: req.body.keeperId,
    address: req.body.address,
    apiKey: randomLetter1 + salt1 + randomLetter2 + salt2 + randomLetter3,
  });

  try {
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
// get behives from mongo atlas
const getBehives = async (req, res, next) => {
  const behives = await Behive.find().exec();
  res.json(behives);
};

// post behive to mongo atlas
const createBehive = async (req, res, next) => {
  const createdBehive = new Behive({
    _id: req.body._id,
    devicesIds: req.body.devicesIds,
  });

  try {
    const result = await createdBehive.save();
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res
        .status(400)
        .json({ error: "Behive with the same ID already exists." });
    } else {
      // Handle other errors
      next(error);
    }
  }
};

// update behive to mongo atlas
const updateBehive = async (req, res, next) => {
  try {
    const BehiveId = req.params.id;
    const updatedData = req.body;

    const updatedBehive = await Behive.findByIdAndUpdate(
      BehiveId,
      updatedData,
      { new: true }
    );

    if (!updatedBehive) {
      return res.status(404).json({ message: "Behive not found" });
    }

    res.json(updatedBehive);
  } catch (error) {
    next(error);
  }
};

// delete behive to mongo atlas
const deleteBehive = async (req, res, next) => {
  try {
    const behiveId = req.params.id;
    const deleteBehive = await Behive.findByIdAndDelete(behiveId);
    if (!deleteBehive) {
      return res.status(404).json({ message: "Behive not found" });
    }
    res.json({ message: "Behive deleted successfully" });
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

  const createData = new Data({
    _id: req.body._id,
    deviceId: req.body.deviceId,
    value: req.body.value,
    timeStamp: req.body.timeStamp,
    registerTimeStamp: req.body.registerTimeStamp,
  });

  try {
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

/* === PICTURES === */
// get pictures from mongo atlas
const getPictures = (req, res, next) => {
  try {
    Picture.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(408).json({ error });
      });
  } catch (error) {
    res.json({ error });
  }
};

const createPicture = async (req, res, next) => {
  const body = req.body;
  try {
    const newPicture = await Picture.create(body);
    newPicture.save();
    res.status(201).json({ msg: "New image uploaded...!" });
  } catch (error) {
    res.status(409).json({ message: error.message });
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
    const nextId = await getNextSequenceValue("aboutId");
    const createAbout = new About({
      _id: nextId,
      title: req.body.title,
      message: req.body.message,
    });

    const result = await createAbout.save();
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

// behives
exports.getBehives = getBehives;
exports.createBehive = createBehive;
exports.updateBehive = updateBehive;
exports.deleteBehive = deleteBehive;

// data
exports.getData = getData;
exports.createData = createData;

// pictures
// exports.getPictures = getPictures;
exports.createPicture = createPicture;
exports.getPictures = getPictures;

// about
exports.getAbout = getAbout;
exports.createAbout = createAbout;
exports.updateAbout = updateAbout;
exports.deleteAbout = deleteAbout;
