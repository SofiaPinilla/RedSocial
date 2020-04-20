const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID

const MessageSchema = new mongoose.Schema({
    messageBody: {
        type: String,
    },

    image_path: String,

    sender_name: String,
    recipient_name: String,
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);