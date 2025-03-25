const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    content : {
        type : String,
        required : true
    },

    likes : {
        type : Number,
        default : 0
    },

    likedUsers :{
        type : [String], default : []
    } 
}, { timestamps : true });

module.exports = mongoose.model('Post', postSchema);