const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    tokens: [],

}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;