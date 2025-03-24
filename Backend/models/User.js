const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },

    email : {
        type : String,
        unique : true,
        required : true 
    },

    password : {
        type : String,
        required : true
    },

    role : {
        type : String,
        enum : ['Admin', 'User'], default : 'User'
    }
}, { timestamps : true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);
