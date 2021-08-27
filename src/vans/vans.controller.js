const vanModel = require("./vans.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const { validationResult } = require("express-validator");

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = bcrypt.genSaltSync(10);
  const entities = await vanModel.create({
    mark: req.body.mark,
    model: req.body.model,
    enrollment: req.body.enrollment,
    km_now: req.body.km_now,
    driver_list: req.body.driver_list,
    revision: req.body.revision,
    state: req.params.state,
    company: req.params.company,
  });
  const token = jwt.sign({ id: entities.id }, process.env.TOKEN_SECRET);
  res.status(201).json({ entities: entities });
};

const getAll = async (req, res) => {
  const vans = await vanModel.getAll();
  return res.status(200).json(vans);
};

const upDate = async (req, res) => {
  const van = await vanModel.upDate(req.params.id);
  const id = req.params.id;
  if (van) {
    const body = req.body;
    vanModel.upDate(id, body);
    return res.status(200).json(body);
  }
  return res.status(404).json({ error: "Van not found" });
};

const get = async (req, res) => {
  const van = await vanModel.get(req.params.id);
  if (van) {
    return res.status(200).json(van);
  }
  return res.status(404).json({ error: "Van not found" });
};

module.exports = {
  create,
  getAll,
  upDate,
  get,
};
