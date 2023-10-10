const mongoose = require('mongoose');
const validator = require("validator");
const userRoles = require('../utils/userRoles');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Field must be a valid email address"]
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    role: {
        type: String, // ["USER","ADMIN","MANAGER"]
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
        default: userRoles.USER
    },
    avatar: {
        type: String,
        //we save the name of the picture in the database
        //we don't save the picture itself in the database
        default: 'uploads/profile.png'
    }
});

module.exports = mongoose.model("User", userSchema);