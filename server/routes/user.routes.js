const express =require('express')
const {protectRoute} = require('../middleware/productRoute') 
const {getUserForSideBar} = require('../controllers/user.controllers') 


const router = express.Router();

router.get("/", protectRoute, getUserForSideBar);

module.exports=  router;