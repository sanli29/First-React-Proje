const jwt = require('jsonwebtoken');
const config = require('config'); //to access the "secret"

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token'); //request token inside the header with key 'x-auth-token'

    if (token) {
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'));

            req.user = decoded.user;
            next(); //middleware
        } catch (err) {
            res.status(401).json({ msg: 'Token is not valid' });
            console.error(err);
        }
    } else return res.status(401).json({ msg: 'No token, authorization denied.' });
};
