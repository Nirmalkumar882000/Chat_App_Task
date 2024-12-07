const express = require('express');
const authControllers =require("../controllers/auth.Controllers")

const router = express.Router();

router.post('/signup',authControllers.register)
router.post('/signin',authControllers.login)
router.post('/logout',authControllers.logout)


module.exports = router;
