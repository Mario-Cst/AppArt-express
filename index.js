const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const van = require("./src/vans/vans.router");

require("dotenv").config();

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = mongoose.connect(process.env.DB_HOST, options);

mongo.then(() => {
  console.log("Ready");
});

global.appRoot = path.resolve(__dirname);

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/van", van);

const start = async () => {
  try {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`REST API on http://localhost:${process.env.PORT || 5000}/`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
