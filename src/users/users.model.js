const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    surename: { type: String, required: true},
    password: { type: String, required: true},
    emailUser: { type: String, required: true},
    emailEnterprise: { type: String, required: true},
    phoneUser: { type: String, required: true},
    phoneEnterprise: { type: String, required: true},
    enterprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "enterprise",
      },
    role: { type: String, default: "user" },
    state: { type: Boolean, default: false },
    active: { type: Boolean, default: true }, 
    dateCreate: { type: Date, default: Date.now },
    dateAct: { type: Date },
    imgUrl: { type: String},
    addressUser: { type: String},
    cityUser: { type: String},
    idUser: { type: String},
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    ssId: { type: String}
});
const UserModel = mongoose.model("users", UserSchema);

const create = async (user)  => {
    const userCreated = await UserModel.create(user);
    return userCreated
}

const getall = async() => {
    const users = await UserModel.find();
    return users
}

const get = async(id) => {
    const user = await UserModel.findById(id)
    return user;
}

const update = async(id, body)  => {
    const user = await UserModel.findByIdAndUpdate(id,body)
    return user
}


const remove  = async(id) => {
    const user  = await UserModel.findByIdAndRemove(id);
    return user; 
}


const search = async (query) => {
    const user = await UserModel.findOne(query);
    return user;
  };

module.exports = {
    create,
    getall,
    get,
    update,
    remove, 
    search,
};