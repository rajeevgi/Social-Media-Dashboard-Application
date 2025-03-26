const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post',
        required : true
    },

    content : {
        type : String,
        required : true,
        trim : true
    },

    likes : {
        type : Number,
        default : 0
    },

    likedUsers : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'User',
        default : []
    }
}, { timestamps : true });

module.exports = mongoose.model('Comment', commentSchema);