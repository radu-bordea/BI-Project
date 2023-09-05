const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./mongoose");

const app = express();

app.use(bodyParser.json());

// locations middleware
app.get("/locations", mongoose.getLocations);
app.post("/locations", mongoose.createLocation);


// keepers middleware
app.get("/keepers", mongoose.getKeepers)
app.post("/keepers", mongoose.createKeeper)


// listening the port
app.listen(5000);

