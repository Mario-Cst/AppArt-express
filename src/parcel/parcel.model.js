const mongoose = require("mongoose");

const parcelSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    company: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "company",
    },
    returnReason: Array,
    createdAt: { type: Date, default: Date.now },
})

const ParcelModel = mongoose.model("parcelModel", parcelSchema)

const create = async (parcel) => await ParcelModel.create(parcel);

const all = async () => await ParcelModel.find();

const one = async (id) => {
    const query = { _id: id };
    return await ParcelModel.findOne(query);
};

const search = async (query) => await ParcelModel.find(query);

const update = async (id, updatedParcel) => {
    const query = { _id: id };
    ParcelModel.updateOne(query, updatedParcel, function (err, docs) {
      err ? console.log(err) : console.log("Updated Parcel: ", docs);
    });
};

const remove = (id) => {
    const query = { _id: id };
    ParcelModel.deleteOne(query, function (err, docs) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Deleted Parcel : ", docs);
      return;
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