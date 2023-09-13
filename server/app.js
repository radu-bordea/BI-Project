const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./mongoose");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your React app's URL if it's different
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// locations middleware
app.get("/locations", mongoose.getLocations);
app.post("/locations", mongoose.createLocation);

// keepers middleware
app.get("/keepers", mongoose.getKeepers);
app.post("/keepers", mongoose.createKeeper);

// types middleware
app.get("/types", mongoose.getTypes);
app.post("/types", mongoose.createType);

// devices middleware
app.get("/devices", mongoose.getDevices);
app.post("/devices", mongoose.createDevice);

// data middleware
app.get("/data", mongoose.getData);
app.post("/data", mongoose.createData);

// listening the port
app.listen(5000);
