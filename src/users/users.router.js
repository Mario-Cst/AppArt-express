const express = require('express');
const router = express.Router();
const userController = require("./users.controller");


router
.route('/')
    .post(userController.create)
    .get(userController.getall);

router 
.route('/active')    
    .get(userController.getallActive);       


router
.route('/:id')
    .put(userController.update)
    .delete(userController.remove)
    .get(userController.get);

router 
.route('/desactivate/:id')    
    .put(userController.deactivate);

router 
.route('/activate/:id')    
    .put(userController.activate);    


module.exports = router;