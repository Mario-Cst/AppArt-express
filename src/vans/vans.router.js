const express = require("express");
const router = express.Router();
const vanController = require("./vans.controller");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");

router
  .route("/")
  .post(
    //body("email").isEmail(),
    //body("password").isLength({ min: 6 }),
    vanController.create
  )
  .get(vanController.getAll);

router.route("/:id").put(vanController.upDate).get(vanController.get);

module.exports = router;
