const express = require('express');
const router = express.Router();

const baseUrl = 'https://image.tmdb.org/t/p';

router.get('/original/:id', (req, res) => {
    const url = encodeURI(`${baseUrl}/original/${req.params.id}`);
    res.redirect(url);
});

router.get('/w*/:id', (req, res) => {
    const url = encodeURI(`${baseUrl}${req.path}`);
    res.redirect(url);
});

module.exports = router;
