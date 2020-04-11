const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserWithPublications } = require('../services/userService.js')
const { jwt_secret } = require('../config/keys.js');

const UserController = {
    async register(req, res) {
        try {
            const { name, email, password, password2 } = req.body;
            let errors = [];
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
            res.status(500).send({ error, message: 'Ha habido un problema tratando de registrar el usuario' })
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
            token = jwt.sign({ id: user.id }, jwt_secret);
            user.tokens.push(token)
            await user.save()
            const userWithPublications = await getUserWithPublications(user._id)
            res.send({ message: 'Welcome ' + user.name, user: userWithPublications, token })

        } catch (errror) {
            console.error(error);
        }
    },
    getInfo(req, res) {
        getUserWithPublications(req.user._id)
            .then(user => res.send(user))
            .catch(console.error);
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

}


module.exports = UserController