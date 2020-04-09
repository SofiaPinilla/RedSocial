const Publication = require('../models/Publication.js');

const PublicationController = {
    getAll(req, res) {
        Publication.find({})
            .then(publications => res.send(publications))
            .catch(console.error)
    },
    insert(req, res) {
        Publication.create(req.body)
            .then(publication => res.status(201).send(publication))
            .catch(console.error)
    }
}

module.exports = PublicationController