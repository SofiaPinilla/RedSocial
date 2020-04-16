const Comment = require('../models/Comment.js');
const { getUserWithPublications } = require('../services/userService.js')
const { getId } = require('../services/publicationservice.js')

// getAll(req, res) {
//     Publication.aggregate([
//             lookupUsers, {
//                 $unwind: "$user"
//             },
//             { $sort: { createdAt: -1 } }
//         ])
//         .then(publications => res.send(publications))
//         .catch(console.error)
// },
const CommentController = {
    getAll(req, res) {

        Comment.find({})
            .then(comments => res.send(comments))
            .catch(console.error)
    },
    getCommentsByPublication() {
        Comment.aggregate([{
                $match: { PublicationId: req.params.publicationId }
            },

            {
                $lookup: {
                    from: 'users',
                    localField: 'UserId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
        ])
    },

    insert(req, res) {
        if (req.file) req.body.image_path = req.file.filename;
        Comment.create({...req.body, UserId: req.user._id, PublicationId: req.params.PublicationId })
            .then(comment => res.status(201).send(comment))
            .catch(console.error)
    },
    async delete(req, res) {
        try {
            await Comment.findByIdAndDelete(req.params._id) // mongoose method which uses the findOneAndDelete()
                // Comment.findOneAndDelete({_id:req.params._id} ) // Mongodb method
                // const publication = await getId(req.PublicationId)
                // console.log(Comment.PublicationId)
            res.send({ publication, message: 'comment deleted' })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem trying to remove the comment' })
        }


    },
}

module.exports = CommentController