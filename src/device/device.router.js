const express = require("express");
const deviceController = require("./device.controller");
const router = express.Router();

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
