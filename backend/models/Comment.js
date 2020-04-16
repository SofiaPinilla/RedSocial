const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    PublicationId: ObjectID,
    UserId: ObjectID

}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);