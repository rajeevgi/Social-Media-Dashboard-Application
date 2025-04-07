const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
    const { username, email, password , role } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if(userExist){
            return res.status(400).json({ mesage : "User Already Exist!"});
        }
        const user = new User({ username, email, password, role });
        const saveUser = await user.save();
        res.status(200).json({ message : "User Registered Sucessfully...", saveUser});
    } catch (error) {
        return res.status(500).json({ message : "Internal Server Error!" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ message : "User not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message : "Invalid Credentials!" });

        const token = jwt.sign({ id : user._id, role : user.role }, process.env.JWT_SECRET, { expiresIn : '1h' });

        res.status(201).json({ message : "Login Successful...", token, user : { id : user._id, username : user.username, email : user.email, role : user.role }});
    } catch (error) {
        return res.status(500).json({ message : "Internal Server Error!" });
    }
}