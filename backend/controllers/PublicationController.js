const Publication = require('../models/Publication.js');

const PublicationController = {
    getAll(req, res) {
        Publication.find({})
            .then(publications => res.send(publications))
            .catch(console.error)
    },
    insert(req, res) {
        Publication.create({...req.body, image_path: req.file.filename })
            .then(publication => res.status(201).send(publication))
            .catch(console.error)
    },

    delete(req, res) {
        Publication.remove({ _id: req.params.id })
            .then(res.send({ message: 'publication deleted' }))
            .catch(console.error)
    }
}

module.exports = PublicationController