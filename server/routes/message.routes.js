const express = require('express');
const messageController = require('../controllers/message.controllers')
const {protectRoute} =require('../middleware/productRoute')

const router = express.Router();

router.get("/:id", protectRoute, messageController.getMessages);
router.post("/send/:id", protectRoute, messageController.sendMessage);

module.exports = router;
