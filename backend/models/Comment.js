const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: false
    },
    image_path: {
        type: String,
        required: false
    },
    PublicationId: ObjectID,
    UserId: ObjectID

}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);