const express = require("express");
const mongoose = require("mongoose");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const users = require("./src/users/users.router");
const auth = require("./src/auth/auth.router");

const van = require("./src/vans/vans.router");
const device = require("./src/device/device.router");
const company = require("./src/company/company.router");

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = mongoose.connect(process.env.DB_HOST, options);
mongo.then(() => {
  console.log("mongo listo");
});

global.appRoot = path.resolve(__dirname);

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable(cors("x-powered-by"));
app.use("/users", users);
app.use("/van", van);
app.use("/device", device);
app.use("/auth", auth);
app.use("/company", company);

app.get("/test", (request, response) => {
  response.send("Soy un test de Appart");
});

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
