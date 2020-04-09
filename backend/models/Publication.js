const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const PublicationSchema = new mongoose.Schema({
    publication: {
        type: String,
        required: true,
        maxlength: 200
    },
    UserId: ObjectID,

}, { timestamps: true });
module.exports = mongoose.model('publication', PublicationSchema);