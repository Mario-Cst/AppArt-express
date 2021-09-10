const express = require("express");
const parcelController = require("./parcel.controller");
const router = express.Router();

router
  .route("/")
  .get(parcelController.getAllParcels)
  .post(parcelController.createOneParcel);

router
  .route("/:id")
  .get(parcelController.getOneParcel)
  .put(parcelController.updateOneParcel)
  .delete(parcelController.removeOneParcel);

module.exports = router;
