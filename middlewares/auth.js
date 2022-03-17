const createHttpError = require('http-errors');
const jwt = require('../utils/jwt');

const auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(createHttpError.Unauthorized('Access token required'));
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(createHttpError.Unauthorized());
    }

    await jwt
        .verifyAccessToken(token)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((e) => {
            next(createHttpError.Unauthorized(e.message));
        });
};

module.exports = auth;
