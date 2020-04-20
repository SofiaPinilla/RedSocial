const Message = require('../models/Message.js');
// const express = require('express');
// const app = express();
//Socket
// let http = require('http').Server(app);
// let io = require('socket.io')(http);

// io.on('connection', () => {
//     console.log('a user is connected')
// })
const MessageController = {
    getAll(req, res) {

        Message.find({})
            .then(messages => res.send(messages))
            .catch(console.error)
    },

    insert(req, res) {
        if (req.file) req.body.image_path = req.file.filename;

        Message.create({...req.body, sender_name: req.user.name, recipient_name: req.params.recipient_name })
            .then(message => res.status(201).send(message))
            .catch(console.error)
    },

    getMessage(req, res) {

        Message.find({ sender_name: req.user.name })
            .then(messages => res.status(201).send(messages))
            .catch(console.error)
    },
    // getSenderMessage(req, res) {

    //     Message.find({ sender_name: req.params.recipient_name, recipient_name: req.user.name })
    //         .then(messages => res.status(201).send(messages))
    //         .catch(console.error)
    // },

    async getSenderMessage(req, res) {
        try {
            const recibidos = await Message.find({ sender_name: req.params.recipient_name, recipient_name: req.user.name })
            const enviados = await Message.find({ sender_name: req.user.name, recipient_name: req.params.recipient_name })
            res.status(201).send({ recibidos, enviados })
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get your messages' })
        }
    }
}




module.exports = MessageController