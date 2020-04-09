const Comment = require('../models/Comment.js');

const CommentController = {
    getAll(req, res) {
        Comment.find({})
            .then(comments => res.send(comments))
            .catch(console.error)
    },
    insert(req, res) {
        Comment.create(req.body)
            .then(comment => res.status(201).send(comment))
            .catch(console.error)
    }
}

module.exports = CommentController