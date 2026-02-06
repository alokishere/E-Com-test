const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//register user
const registerUser = async (req, res) => {
    try {
        const { fullName, mobile, password } = req.body;
        const isUserExist = await User.findOne({ mobile });
        if(isUserExist){
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ fullName, mobile, password:hashedPassword });
        res.status(201).json({ 
            message: "User registered successfully",
            fullName: user.fullName,
            mobile: user.mobile,
            id: user._id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            isAdmin: user.isAdmin
            
         });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//login user

const loginUser = async (req, res) => {
    try {
        const { mobile, password } = req.body;
        const user = await User.findOne({ mobile });
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ error: "Invalid password" });
        }
        res.status(200).json({ 
            message: "User logged in successfully",
            fullName: user.fullName,
            mobile: user.mobile,
            id: user._id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            isAdmin: user.isAdmin
            
         });
    } catch (error) {
        res.status(500).json({ "login error": error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.status(200).json({ 
            message: "User logged out successfully"
         });
    } catch (error) {
        res.status(500).json({ "logout error": error.message });
    }
}



module.exports = { registerUser, loginUser, logoutUser };
