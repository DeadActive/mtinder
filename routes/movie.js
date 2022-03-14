const express = require('express');
const config = require('../config');
const tmdb = require('../api/tmdb');
const router = express.Router();

router.get('/random', async (req, res) => {
    try {
        const { data } = await tmdb.getMovieRandom();
        res.send(data);
    } catch (e) {
        res.sendStatus(400);
    }
});

router.get('/popular', async (req, res) => {
    try {
        const { data } = await tmdb.getMoviePopular();
        res.send(data);
    } catch (e) {
        res.sendStatus(400);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { data } = await tmdb.getMovie(req.params.id);
        res.send(data);
    } catch (e) {
        res.sendStatus(400);
    }
});

router.get('/:id/recommended', async (req, res) => {
    try {
        const { data } = await tmdb.getMovieRecommended(req.params.id);
        res.send(data);
    } catch (e) {
        res.sendStatus(400);
    }
});

router.get('/:id/videos', async (req, res) => {
    try {
        const { data } = await tmdb.getMovieVideos(req.params.id);
        res.send(data.results);
    } catch (e) {
        res.sendStatus(400);
    }
});

router.get('/:id/trailers', async (req, res) => {
    try {
        const { data } = await tmdb.getMovieVideos(req.params.id);
        const trailers = data.results.filter((x) => x.type === 'Trailer');
        res.send(trailers);
    } catch (e) {
        res.sendStatus(400);
    }
});

module.exports = router;
