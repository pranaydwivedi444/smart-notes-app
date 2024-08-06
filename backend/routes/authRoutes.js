const { Router } = require("express");
const { register, login } = require("../controller/authController");
const router = Router();
//import middles wares

router.post('/signup',register);
//sign up 


router.post('/signin',login);
//sign in 

module.exports = router;