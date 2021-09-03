const express = require("express");
const router = express.Router();
const deviceController = require("./device.controller");

router
  .route("/")
  .get(deviceController.getAllDevices)
  .post(deviceController.createOneDevice);

router
  .route("/:id")
  .get(deviceController.getOneDevice)
  .put(deviceController.updateOneDevice)
  .delete(deviceController.removeOneDevice);

module.exports = router;
