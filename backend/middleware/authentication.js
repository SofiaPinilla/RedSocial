const User = require('../models/User');
const Publication = require('../models/Publication');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys.js')
const authentication = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret);
        const user = await User.findOne({ _id: payload.id, tokens: token });
        if (!user) {
            return res.status(401).send({ message: 'No estas autorizado' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema con el token' })
    }

}
const isAuthor = async(req, res, next) => {
    try {
        const publication = await Publication.findById(req.params._id); //Mongoose method that uses findOne behind the scenes :D
        // const publication = await Publication.findOne({ _id: req.params._id }); //MongoDB method
        //debemos convertir los objectId a string para poderlos comparar los _id correctamente dado que {}!== {} es siempre true
        if (publication.UserId.toString() !== req.user._id.toString()) { //comprobamos que el userId  que creo la publication coincide con el _id del user que hace la petición
            return res.status(403).send({ message: 'No eres autor de la publicación' });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría de la publicación' })
    }
}
const isCommentAuthor = async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params._id);
        //Mongoose method that uses findOne behind the scenes :D
        // const publication = await Publication.findOne({ _id: req.params._id }); //MongoDB method
        //debemos convertir los objectId a string para poderlos comparar los _id correctamente dado que {}!== {} es siempre true
        if (comment.UserId.toString() !== req.user._id.toString()) { //comprobamos que el userId  que creo la publication coincide con el _id del user que hace la petición
            return res.status(403).send({ message: 'No eres autor del comentario' });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema al comprobar la autoría del comentario' })
    }
}
module.exports = { authentication, isAuthor, isCommentAuthor }