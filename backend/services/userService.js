const User = require('../models/User.js');

const lookupPublications = {

    $lookup: {
        from: 'publications',
        let: { id: "$_id" },
        pipeline: [
            { $match: { $expr: { $eq: ["$UserId", "$$id"] } } },

            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'PublicationId',
                    as: 'comments'
                },
            },
        ],
        as: 'publications',
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
    },

    getUserWithPublicationsName: async(name) => {
        try {
            const users = await User.aggregate([
                { $match: { name } },
                lookupPublications,
                { $unset: ["password", "tokens", "__v"] }
            ])

            return users;
        } catch (error) {
            console.error(error)
        }
    },

    // getUserWithPublicationsEmail: async(email) => {
    //     try {
    //         const [user] = await User.aggregate([
    //             { $match: { email } },
    //             lookupPublications,
    //             { $unset: ["password", "tokens", "__v"] }
    //         ])
    //         user.publications.reverse();
    //         return user;
    //     } catch (error) {
    //         console.error(error)
    //     }
    // },

}
module.exports = UserService;