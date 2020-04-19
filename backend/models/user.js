const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
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

    confirmed: false,

    agree: {
        type: Boolean,
        required: true
    },


    userInfo: String,

    profile_path: String,

    header_path: String,

    followers: [],

    following: [],

    tokens: [],

}, { timestamps: true });
UserSchema.index({
    name: 'text'

});
UserSchema.methods.toJSON = function() {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    return user;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;