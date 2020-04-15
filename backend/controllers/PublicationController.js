const Publication = require('../models/Publication.js');
const { getUserWithPublications } = require('../services/userService.js')
const { getId } = require('../services/publicationservice.js')

// const Publication = mongoose.model('../models/Publication.js')


const lookupUsers = {
    $lookup: {
        //agregar datos de la colección users
        from: 'users',
        //el campo UserId de Publication
        localField: 'UserId',
        //debe coincidir con el _id de users
        foreignField: '_id',
        //creamos una propiedad llamada 'user' que contenga las coincidiencias
        as: 'user'
    }
}

// const lookupComments = {
//     $lookup: {

//             from: 'comments',
//             let:
//             pipeline: lookup
//             as:
//           }
// }

// getInfo(req, res) {
//     getUserWithPublications(req.user._id)
//         .then(user => res.send(user))
//         .catch(console.error);
// }
const PublicationController = {
    getPubliId(req, res) {
        getId(req.params._id)
            .then(publication => res.send(publication))
            .catch(console.error);
    },


    getAll(req, res) {
        Publication.aggregate([
                lookupUsers, {
                    $unwind: "$user"
                },
                { $sort: { createdAt: -1 } }
            ])
            .then(publications => res.send(publications))
            .catch(console.error)
    },

    search() {
        Publication.aggregate([{
                    $match: {
                        $text: { $search: req.params.search }
                    }
                },
                lookupUsers, { //para evitar user:[{_id:....}] y en su lugar enviar el objeto user:{_id:...}
                    $unwind: "$user"
                }
            ])
            .then(publications => res.send(publications))
            .catch(console.error)
    },

    insert(req, res) {
        if (req.file) req.body.image_path = req.file.filename;
        Publication.create({...req.body, UserId: req.user._id })
            .then(publication => res.status(201).send(publication))
            .catch(console.error)
    },
    update(req, res) { //new es para que devuelva el registro actualizado, por defecto es false por lo que la promesa se resuelve con el registro sin actualizar
        if (req.file) req.body.image_path = req.file.filename;
        Publication.findByIdAndUpdate(req.params._id, req.body, { new: true }) // mongoose method which uses the findOneAndUpdate()
            // Publication.findOneAndUpdate({_id:req.params._id} ) // Mongodb method
            .then(publication => res.send({ message: 'publication successfully updated', publication }))
            .catch(console.error)
    },
    async delete(req, res) {
        try {
            await Publication.findByIdAndDelete(req.params._id) // mongoose method which uses the findOneAndDelete()
                // Publication.findOneAndDelete({_id:req.params._id} ) // Mongodb method
            const user = await getUserWithPublications(req.user._id)
            res.send({ user, message: 'publication deleted' })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem trying to remove the publication' })
        }


    },

}

module.exports = PublicationController