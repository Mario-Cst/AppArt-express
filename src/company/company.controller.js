const companyModel = require("./company.model");
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
  const entities = await companyModel.create({
    name: req.body.name,
    adress: req.body.adress,
    cp: req.body.cp,
    city: req.body.city,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
  });
  const token = jwt.sign({ id: entities.id }, process.env.TOKEN_SECRET);
  res.status(201).json({ entities: entities });
};

const getAll = async (req, res) => {
  const companies = await companyModel.getAll();
  return res.status(200).json(companies);
};

const upDate = async (req, res) => {
  const company = await companyModel.upDate(req.params.id);
  const id = req.params.id;
  if (company) {
    const body = req.body;
    companyModel.upDate(id, body);
    return res.status(200).json(body);
  }
  return res.status(404).json({ error: "Company not found" });
};
/* const upDate = async (req, res) => {
  const company = await companyModel.upDate(req.params.id);
  const id = req.params.id;
  if (company) {
    const body = req.body;
    companyModel.upDate(id, body);
    return res.status(200).json(body);
  }
  return res.status(404).json({ error: "Company not found" });
}; */

const get = async (req, res) => {
  const company = await companyModel.get(req.params.id);
  //const id = req.params.id;
  if (company) {
    return res.status(200).json(company);
  }
  return res.status(404).json({ error: "Company not found" });
};

module.exports = {
  create,
  getAll,
  upDate,
  get,
};
