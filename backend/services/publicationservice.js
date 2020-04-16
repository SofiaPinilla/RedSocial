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
                        let: { id: "$_id"},
                        // xd: console.log(PublicationId),
                        pipeline: [
                                {$match: { $expr: { $eq: ["$PublicationId", "$$id" ] } }},
                            
                            {
                                $lookup: {
                                    from: 'users',
                                    localField: 'UserId',
                                    foreignField: '_id',
                                    as: 'user'
                                },
                            },
                            // { $match: { "$expr": { "$eq": ["$PublicationId", "$$id"] } } },
                            // { $match: { $expr: { $eq: ["$bot", false] } } }

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
            return publication;

        } catch (error) {
            console.error(error)
        }
    }
}
module.exports = PublicationService;