const express = require('express');
const createHttpError = require('http-errors');
const router = express.Router();
const auth = require('../../services/auth.service');

router.post('/register', async (req, res, next) => {
    try {
        const user = await auth.register(req.body);
        res.status(200).json({
            status: true,
            message: 'User created',
            data: user,
        });
    } catch (e) {
        next(createHttpError(e.statusCode, e.message));
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const data = await auth.login(req.body);
        res.status(200).json({
            status: true,
            message: 'Login successful',
            data,
        });
    } catch (e) {
        next(createHttpError(e.statusCode, e.message));
    }
});

router.get('/all', async (req, res, next) => {
    try {
        const users = await auth.all();
        res.status(200).json({
            data: users,
        });
    } catch (e) {
        next(createHttpError(e.statusCode, e.message));
    }
});

router.get('/me', async (req, res, next) => {
    try {
        const user = await auth.me(req.headers.authorization.split(' ')[1]);
        res.status(200).json({
            ...user,
        });
    } catch (e) {
        if (e.statusCode) {
            return next(createHttpError(e.statusCode, e.message));
        }
        next(createHttpError(500, e.message));
    }
});

router.put('/me', async (req, res, next) => {
    try {
        const user = await auth.update(
            req.headers.authorization.split(' ')[1],
            req.body
        );
        res.status(200).json({
            status: true,
            message: 'Update successfull',
            data: user,
        });
    } catch (e) {
        next(createHttpError(e.statusCode, e.message));
    }
});

module.exports = router;
