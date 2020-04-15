const Publication = require('../models/Publication.js');
const User = require('../models/User.js');
const ObjectID = require('mongodb').ObjectID



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
                    $unwind: "$user"
                }

            ])


            return publication;

        } catch (error) {
            console.error(error)
        }
    }
}
module.exports = PublicationService;
module.exports = PublicationService;