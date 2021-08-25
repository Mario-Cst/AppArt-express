const UserModel = require("./users.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



const create = async (req, res) =>{
    const salt = bcrypt.genSaltSync(10);
    const user = await UserModel.create({
      name:req.body.name,
      surename:req.body.surename,
      emailUser: req.body.emailUser,
      emailEnterprise: req.body.emailEnterprise,
      phoneUser: req.body.phoneUser,
      phoneEnterprise: req.body.phoneEnterprise,
      enterprise: req.body.enterprise,
      password: bcrypt.hashSync(req.body.password, salt),
    });
    const token = jwt.sign({id: user.id},process.env.TOKEN_SECRET);
    res.status(201).json(token);
  };

const getall = async (req, res) => {
    const users = await  UserModel.getall();
        res.json(users);
}

const update = async (req, res) => {
    const user = await UserModel.get(req.params.id)
    const id = (req.params.id)
    if (user) {
        const body = req.body;
        UserModel.update(id,body);
        return res.status(200).json(body);
    }
    
    return res.status(400).json({error: "user no found"})
}   

const remove = async (req, res) => {
    const user =  await UserModel.get(req.params.id)
    id = (req.params.id)
    if (user){
        UserModel.remove(id);
        return res.status(200).json({ "borrado" : user})
    }
    return res.status(404).json({ error: "no puedes borrar lo que no esta"})    
}

const get = async (req, res) =>{
    const user = await UserModel.get(req.params.id);
    const id = (req.params.id)
   
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ error: "user not found"})
  
  }


module.exports = {
    create,
    getall,
    update,
    remove,
    get,
}