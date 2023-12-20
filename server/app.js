const express = require("express");
const bodyParser = require("body-parser");
cors = require("cors");
const mongoose = require("./mongoose");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your React app's URL if it's different
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// locations middleware
app.get("/locations", mongoose.getLocations);
app.post("/locations", mongoose.createLocation);
app.put("/locations/:id", mongoose.updateLocation);
app.delete("/locations/:id", mongoose.deleteLocation);

// keepers middleware
app.get("/keepers", mongoose.getKeepers);
app.post("/keepers", mongoose.createKeeper);
app.put("/keepers/:id", mongoose.updateKeeper);
app.delete("/keepers/:id", mongoose.deleteKeeper);

// types middleware
app.get("/types", mongoose.getTypes);
app.post("/types", mongoose.createType);
app.put("/types/:id", mongoose.updateType);
app.delete("/types/:id", mongoose.deleteType);

// devices middleware
app.get("/devices", mongoose.getDevices);
app.post("/devices", mongoose.createDevice);
app.put("/devices/:id", mongoose.updateDevice);
app.delete("/devices/:id", mongoose.deleteDevice);

// data middleware
app.get("/data", mongoose.getData);
app.post("/data", mongoose.createData);

// behives middleware
app.get("/behives", mongoose.getBehives);
app.post("/behives", mongoose.createBehive);

// listening the port
app.listen(5000);
