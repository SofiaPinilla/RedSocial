const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys.js')
const UserController = {
    register(req, res) {
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
            newUser = new User({...req.body })
            bcrypt.genSalt(10, (errors, salt) => {
                bcrypt.hash(newUser.password, salt, (errors, hash) => {
                    if (errors) throw errors;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.send(user))
                        .catch(errors => console.log(errors));
                });
            })
        }

    },
    login(req, res) {
        User.findOne({
                email: req.body.email,
            })
            .then(user => {
                if (!user) {
                    return res.status(400).send({ message: 'Incorrect User or Password' });
                }
                bcrypt.compare(req.body.password, user.password).then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).send({ message: 'Incorrect User or Password' });
                    }
                    token = jwt.sign({ id: user.id }, jwt_secret);
                    user.tokens.push(token)
                    return user.save()
                }).then(user => res.send({ message: 'Welcome' + user.name, user, token }))
            })

    },
    getInfo(req, res) {
        res.send(req.user);
    },
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