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
                    localField: 'PublicationId',
                    foreignField: '_id',
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
    }
}
module.exports = UserService;