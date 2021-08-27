const mongoose = require("mongoose");

const VanSchema = new mongoose.Schema({
  mark: String,
  model: String,
  enrollment: String,
  km_now: Number,
  driver_list: String, //{ type: String, required: true },
  revision: String,
  state: String,
  company: String,
  createDate: { type: Date, default: Date.now },
  companyUpdate: Date,
});

const vanModel = mongoose.model("van", VanSchema);

const getAll = async () => {
  const van = await vanModel.find();
  return van;
};
const create = async (van) => {
  const vanCreated = await vanModel.create(van);
  return vanCreated;
};
const upDate = async (id, body) => {
  const van = await vanModel.findByIdAndUpdate(id, body);
  return van;
};
const get = async (id) => {
  const van = await vanModel.findById(id);
  return van;
};
const search = async (query) => {
  const van = await vanModel.findOne(query);
  return van;
};
module.exports = {
  getAll,
  create,
  upDate,
  search,
  get,
};
