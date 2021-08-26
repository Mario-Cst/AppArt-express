const express = require("express");
const router = express.Router();
const companyController = require("./company.controller");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");

router
  .route("/")
  .post(
    //body("email").isEmail(),
    //body("password").isLength({ min: 6 }),
    companyController.create
  )
  .get(companyController.getAll);

router.route("/:id").put(companyController.upDate).get(companyController.get);

module.exports = router;
