const user = require('./user');
const movie = require('./movie');
const image = require('./image');
const auth = require('./auth');
const express = require('express');
const createHttpError = require('http-errors');
const router = express.Router();

const routes = {
    user,
    movie,
    image,
    auth,
};

Object.entries(routes).forEach(([key, route]) => {
    console.log(`Register route /${key}`);
    router.use(`/${key}`, route);
});

router.use(async (req, res, next) => {
    return next(createHttpError.NotFound('Route not found'));
});

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message,
    });
});

module.exports = router;
