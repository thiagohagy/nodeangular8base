var express = require('express');
var jwt    = require('jsonwebtoken');
var config = require('./config');

var jwtRouter = express.Router();

jwtRouter.use(function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['authorization']; // get token wherever it is

    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(403).send({ success: false, message: 'Invalid token.', login: true });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.',
        });
    }
});

module.exports = jwtRouter;
