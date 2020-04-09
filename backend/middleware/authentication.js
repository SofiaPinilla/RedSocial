const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authentication = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, 'secretitos');
        const user = await User.findByPk(payload.id);
        if (!user || !tokenFound) {
            res.status(401).send({ message: 'No estas autorizado' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(500).send({ error, message: 'Ha habido un problema con el token' })
    }

}
module.exports = { authentication }