const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/auth.controller");




//register user
router.post("/register", registerUser);

//login user
router.post("/login", loginUser);

//logout user
router.post("/logout", logoutUser);







module.exports = router;