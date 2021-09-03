const DeviceModel = require("./device.model");

const createOneDevice = async (req, res) => {
  const deviceData = req.body;
  const device = await DeviceModel.create(deviceData);

  return res.status(201).json(device);
};

const getAllDevices = async (req, res) => {
  const devices = await DeviceModel.all();

  return res.status(200).json(devices);
};

const getOneDevice = async (req, res) => {
  const device = await DeviceModel.one(req.params.id);

  if (device) {
    return res.status(200).json(device);
  }
  return res.status(404).end();
};

const updateOneDevice = async (req, res) => {
  const updatedDevice = req.body;
  const deviceUpdated = await DeviceModel.update(req.params.id, updatedDevice);
  return res.status(200).json(deviceUpdated);
};

const removeOneDevice = (req, res) => {
  DeviceModel.remove(req.params.id);
  return res.status(200).json({ message: "Device deleted" });
};

module.exports = {
  createOneDevice,
  getAllDevices,
  getOneDevice,
  updateOneDevice,
  removeOneDevice,
};
