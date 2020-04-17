const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const PublicationSchema = new mongoose.Schema({
    publication: {
        type: String,
        maxlength: 200,

    },
    image_path: {
        type: String,
        required: false
    },

    likes: [],

    UserId: ObjectID,


}, { timestamps: true });
PublicationSchema.index({
    publication: 'text'
});
module.exports = mongoose.model('Publication', PublicationSchema);