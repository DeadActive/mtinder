const createHttpError = require('http-errors');
const jwt = require('../utils/jwt');
const prisma = require('../db');

const auth = (roles) => {
    return async (req, res, next) => {
        if (!req.headers.authorization) {
            return next(createHttpError.Unauthorized('Access token required'));
        }

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return next(createHttpError.Unauthorized());
        }

        await jwt
            .verifyAccessToken(token)
            .then(async (user) => {
                const me = await prisma.user.findUnique({
                    where: {
                        username: user.payload.username,
                    },
                });

                if (roles.indexOf(me.role) === -1) {
                    return next(createHttpError.Forbidden('Access denied'));
                }

                req.user = user;
                next();
            })
            .catch((e) => {
                next(createHttpError.Unauthorized(e.message));
            });
    };
};

module.exports = auth;
