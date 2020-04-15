const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const PublicationSchema = new mongoose.Schema({
    publication: {
        type: String,
        maxlength: 200
    },
    image_path: {
        type: String,
        required: false
    },
    UserId: ObjectID,

}, { timestamps: true });
module.exports = mongoose.model('Publication', PublicationSchema);