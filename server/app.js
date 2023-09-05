const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./mongoose");

const app = express();

app.use(bodyParser.json());

app.post("/locations", mongoose.createLocation);

app.get("/locations", mongoose.getLocations);

app.listen(5000);
