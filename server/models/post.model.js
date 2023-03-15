const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        owner: {
            type: String,
            required: true,
        },
        imageurl: {
            type: String,
            require: true,
        },
        title: {
            type: String,
            require: true,
        },
        post_desc : {
            type : String,
            require : true
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);