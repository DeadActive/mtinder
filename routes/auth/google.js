const express = require('express');
const createHttpError = require('http-errors');
const router = express.Router();
const google = require('../../services/google.service');

router.get('/link', (req, res) => {
    const link = google.loginLink();

    res.status(200).json({
        url: link,
    });
});

router.get('/callback', async (req, res, next) => {
    try {
        if (req.query.error) {
            throw createHttpError.Unauthorized('No permission');
        }

        const token = await google.callback(req.query.code);

        res.status(200).json({
            token,
        });
    } catch (e) {
        if (e.statusCode) {
            return next(createHttpError(e.statusCode, e.message));
        }
        next(createHttpError(500, e.message));
    }
});

module.exports = router;
