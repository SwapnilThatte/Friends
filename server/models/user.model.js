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
        friends: {
            type: [String],
        },
        title : {
            type : String,
            default : "Hey!"
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);