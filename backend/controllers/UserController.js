const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserWithPublications, getUserWithPublicationsName } = require('../services/userService.js')
const { jwt_secret, API_URL } = require('../config/keys.js');
const transporter = require('../config/nodemailer')

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

const lookupProfile = {
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
            { $unwind: "$user" },

        ],
        as: 'comments',

    }
}

const UserController = {
    async register(req, res) {
        try {
            const { name, email, password, password2, confirmed } = req.body;
            let errors = [];
            // const emailToken = jwt.sign({ email }, jwt_secret, { expiresIn: '48h' });
            // const url = API_URL + '/users/confirm/' + emailToken;

            if (!name || !email || !password || !password2) {
                errors.push({ msg: 'Please enter all fields' });
            }
            if (password != password2) {
                errors.push({ msg: 'Passwords do not match' });
            }
            if (errors.length > 0) {
                res.send({
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            } else {

                User.findOne({ email: email }).then(user => {
                    if (user) {
                        res.status(400).send({ message: 'Email already exists' })
                        res.render('register', {
                            errors,
                            name,
                            email,
                            password,
                            password2
                        });
                    } else {
                        const email = req.body.email
                        const emailToken = jwt.sign({ email }, jwt_secret, { expiresIn: '48h' });
                        const url = API_URL + 'users/confirm/' + emailToken;
                        transporter.sendMail({
                            to: email,
                            subject: 'Validate your account in Beyond the Army',
                            html: `
                            <h3>Welcome ${req.body.name} to Beyond the Army, only one more step</h3>
                            <a href="${url}">Click here and complete your register</a>
                            This link expire in 48 hours.
                            `
                        })

                        .then(res.status(201).send({
                            user,
                            message: 'We send you a confirmation email'
                        }));
                        newUser = new User({...req.body });
                        bcrypt.hash(newUser.password, 10)
                            .then(hash => {
                                newUser.password = hash;
                                return newUser.save();
                            })
                            .then(user => res.send({ message: 'Registered ' + user.name }))
                            .catch(console.error)
                    }
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error, message: 'There was a problem trying to register' })
        }
    },
    async confirm(req, res) {
        try {
            const emailToken = req.params.emailToken;
            const payload = jwt.verify(emailToken, jwt_secret);
            const email = payload.email;
            // Mongoose findOneAndUpdate
            const user = await User.findOneAndUpdate({ email }, { confirmed: true })
            const authToken = jwt.sign({
                id: user.id
            }, jwt_secret);

            await user.tokens.push(authToken);
            await user.save();

            res.redirect('http://localhost:4200/user/confirmado/' + authToken);

        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al confirmar el usuario', error })
        }
    },
    async update(req, res) {
        try {
            if (req.file) req.body.profile_path = req.file.filename;
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true })
            res.send({ message: 'User successfully updated', user })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There was a problem trying to update the header' })
        }
    },
    async updateHeader(req, res) {
        try {
            if (req.file) req.body.header_path = req.file.filename;
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const user = await User.findByIdAndUpdate(req.user._id, { header_path: req.body.header_path }, { new: true });
            res.send({ message: 'header was succesfully updated', user })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There was a problem trying to update the header' })
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            })

            if (!user) {
                return res.status(400).send({ message: 'Incorrect User or Password' });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password)

            if (!isMatch) {
                return res.status(400).send({ message: 'Incorrect User or Password' });
            }

            if (!user.confirmed) {
                return res.status(400).send({ message: 'You have to validate your email' });
            }
            token = jwt.sign({ id: user.id }, jwt_secret);
            user.tokens.push(token);
            await user.save();
            const userWithPublications = await getUserWithPublications(user._id);
            res.send({ message: 'Welcome ' + user.name, user: userWithPublications, token });

        } catch (errror) {
            console.error(error);
        }
    },
    async follow(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.user._id, { $push: { following: req.params.user_id } }, { new: true });
            await User.findByIdAndUpdate(req.params.user_id, { $push: { followers: req.user._id } });
            res.send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to follow' })
        }
    },
    getInfo(req, res) {
        getUserWithPublications(req.user._id)
            .then(user => res.send(user))
            .catch(console.error);
    },

    getAll(req, res) {
        User.find({})
            .then(users => res.send(users))
            .catch(console.error)

    },
    getInfoId(req, res) {
        getUserWithPublicationsName(req.params.search)
            .then(users => res.send(users))
            .catch(console.error)

    }
}

// async logout(req, res) {
//     try {
//         await Token.destroy({
//             where: {
//                 [Op.and]: [
//                     { UserId: req.user.id },
//                     { token: req.headers.authorization }
//                 ]
//             }
//         });
//         res.send({ message: 'Desconectado con éxito' })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({ message: 'hubo un problema al tratar de desconectarte' })
//     }
// }




module.exports = UserController