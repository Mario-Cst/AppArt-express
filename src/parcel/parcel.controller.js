const ParcelModel = require("./parcel.model");

const createOneParcel = async (req, res) => {
  const parcelData = req.body;
  const parcel = await ParcelModel.create(parcelData);

  return res.status(201).json(parcel);
};

const getAllParcels = async (req, res) => {
  const parcels = await ParcelModel.all();

  return res.status(200).json(parcels);
};

const getOneParcel = async (req, res) => {
  const parcel = await ParcelModel.one(req.params.id);

  if (parcel) {
    return res.status(200).json(parcel);
  }
  return res.status(404).end();
};

const updateOneParcel = async (req, res) => {
  const updatedParcel = req.body;
  const parcelUpdated = await ParcelModel.update(req.params.id, updatedParcel);
  return res.status(200).json(parcelUpdated);
};

const removeOneParcel = (req, res) => {
  ParcelModel.remove(req.params.id);
  return res.status(200).json({ message: "Parcel deleted" });
};

module.exports = {
  createOneParcel,
  getAllParcels,
  getOneParcel,
  updateOneParcel,
  removeOneParcel,
};