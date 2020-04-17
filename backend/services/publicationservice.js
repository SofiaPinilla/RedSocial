const Publication = require('../models/Publication.js');
const User = require('../models/User.js');
const ObjectID = require('mongodb').ObjectID



const unsetUserFields = { $unset: ["user.password", "user.tokens", "user.__v"] }

const PublicationService = {
    getId: async(_id) => {

        try {

            const [publication] = await Publication.aggregate([

                {
                    $match: {
                        _id: ObjectID(_id),
                    }
                },
                {
                    $lookup: {

                        from: 'users',
                        localField: 'UserId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },

                {
                    $lookup: {
                        from: 'comments',
                        let: { id: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$PublicationId", "$$id"] } } },

                            {
                                $lookup: {
                                    from: 'users',
                                    localField: 'UserId',
                                    foreignField: '_id',
                                    as: 'user'
                                },
                            },

                            unsetUserFields,
                            { $unwind: "$user" },

                        ],
                        as: 'comments',

                    }
                }, {
                    $unwind: "$user"
                },
                unsetUserFields,


            ])
            publication.comments.reverse();
            return publication;

        } catch (error) {
            console.error(error)
        }
    },

    getPubliWithAll: async() => {

        try {

            const publications = Publication.aggregate([

                {
                    $lookup: {

                        from: 'users',
                        localField: 'UserId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },

                {
                    $lookup: {
                        from: 'comments',
                        let: { id: "$_id" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$PublicationId", "$$id"] } } },

                            {
                                $lookup: {
                                    from: 'users',
                                    localField: 'UserId',
                                    foreignField: '_id',
                                    as: 'user'
                                },
                            },

                            unsetUserFields,
                            { $unwind: "$user" },

                        ],
                        as: 'comments',

                    }
                }, {
                    $unwind: "$user"
                },
                unsetUserFields,


            ])
            return publications;

        } catch (error) {
            console.error(error)
        }
    },
}
module.exports = PublicationService;