const express = require("express");
const bodyParser = require("body-parser");
cors = require("cors");
const mongoose = require("./mongoose");


const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://bi-project-client.onrender.com/"); // Replace with your React app's URL if it's different
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// locations middleware
app.get("/locations", mongoose.getLocations);
app.post("/locations", mongoose.createLocation);
app.put("/location/:id", mongoose.updateLocation);
app.delete("/location/:id", mongoose.deleteLocation);

// keepers middleware
app.get("/keepers", mongoose.getKeepers);
app.post("/keepers", mongoose.createKeeper);
app.put("/keeper/:id", mongoose.updateKeeper);
app.delete("/keeper/:id", mongoose.deleteKeeper);

// types middleware
app.get("/types", mongoose.getTypes);
app.post("/types", mongoose.createType);
app.put("/type/:id", mongoose.updateType);
app.delete("/type/:id", mongoose.deleteType);

// devices middleware
app.get("/devices", mongoose.getDevices);
app.post("/devices", mongoose.createDevice);
app.put("/device/:id", mongoose.updateDevice);
app.delete("/device/:id", mongoose.deleteDevice);

// behives middleware
app.get("/behives", mongoose.getBehives); 

app.post("/behives", mongoose.createBehive);
app.put("/behive/:id", mongoose.updateBehive);
app.delete("/behive/:id", mongoose.deleteBehive);

// data middleware
app.get("/data", mongoose.getData);
app.post("/data", mongoose.createData);
// app.post("/data/api", mongoose.createData);


// listening the port
app.listen(5000);
