const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: String,
  adress: String,
  cp: String,
  city: String,
  email: String, //{ type: String, required: true },
  password: String,
  createDate: { type: Date, default: Date.now },
  companyUpdate: Date,
});

const companyModel = mongoose.model("company", CompanySchema);

const getAll = async () => {
  const company = await companyModel.find();
  return company;
};
const create = async (company) => {
  const companyCreated = await companyModel.create(company);
  return companyCreated;
};
const upDate = async (id, body) => {
  const company = await companyModel.findByIdAndUpdate(id, body);
  return company;
};
const get = async (id) => {
  const company = await companyModel.findById(id);
  return company;
};
const search = async (query) => {
  const company = await companyModel.findOne(query);
  return company;
};
module.exports = {
  getAll,
  create,
  upDate,
  get,
};
