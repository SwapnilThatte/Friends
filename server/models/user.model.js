const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePhotoURL: {
            type: String,
            default: "",
        },
        followers: {
            type: [String],
        },
        followedByMe: {
            type: [String],
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);