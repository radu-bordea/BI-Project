const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("./mongoose");
const multer = require("multer");
const path = require("path");
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));

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

// **************** PICTURES UPLOADS *******************
// **************** PICTURES UPLOADS *******************
// **************** PICTURES UPLOADS *******************

app.get("/pictures", mongoose.getPictures)
app.post("/pictures", mongoose.createPicture)
// app.post("/pictures", upload.single("file"), mongoose.createPicture);
// app.delete("/pictures/:id", mongoose.deletePicture);

// **************** PICTURES UPLOADS *******************
// **************** PICTURES UPLOADS *******************
// **************** PICTURES UPLOADS *******************

app.get("/about", mongoose.getAbout)
app.post("/about", mongoose.createAbout)
app.put("/about/:id", mongoose.updateAbout)
app.delete("/about/:id", mongoose.deleteAbout)

// // Render
// Catch-all route to serve the React application
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Listening to the port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
