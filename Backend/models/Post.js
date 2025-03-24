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
    }
}, { timestamps : true });

module.exports = mongoose.model('Post', postSchema);