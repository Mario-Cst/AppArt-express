const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
  brand: String,
  model: String,
  number: String,
  imei: String,
  driversList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drivers",
  },
  status: Boolean,
});

const DeviceModel = mongoose.model("deviceModel", deviceSchema);

const create = async (device) => await DeviceModel.create(device);

const all = async () => await DeviceModel.find();

const one = async (id) => {
  const query = { _id: id };
  return await DeviceModel.findOne(query);
};

const search = async (query) => await DeviceModel.find(query);

const update = async (id, updatedDevice) => {
  const query = { _id: id };
  DeviceModel.updateOne(query, updatedDevice, function (err, device) {
    err ? console.log(err) : console.log("Updated Device: ", device);
  });
};

const remove = (id) => {
  const query = { _id: id };
  DeviceModel.deleteOne(query, function (err, device) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Device : ", device);
    }
  });
};

module.exports = {
  create,
  all,
  one,
  search,
  update,
  remove,
};
