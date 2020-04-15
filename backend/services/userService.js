const User = require('../models/User.js');
const lookupPublications = {
    $lookup: {
        //agregar datos de la colección publications
        from: 'publications',
        //el campo publicationId de User
        localField: '_id',
        //debe coincidir con el _id de publications
        foreignField: 'UserId',
        //creamos una propiedad llamada 'publication' que contenga las coincidiencias
        as: 'publications'
    }
}
const UserService = {

    getUserWithPublications: async(_id) => {
        try {
            const [user] = await User.aggregate([
                { $match: { _id } },
                lookupPublications,
                { $unset: ["password", "tokens", "__v"] }
            ])
            user.publications.reverse();
            return user;
        } catch (error) {
            console.error(error)
        }
    }
}
module.exports = UserService;