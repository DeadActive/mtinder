const axios = require('axios');
const config = require('../config');

const client = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: config.api_key,
        language: 'ru-RU',
    },
});

const api = {
    getMovie(id) {
        return client.get(`movie/${id}`);
    },
    getMovieRecommended(id) {
        return client.get(`movie/${id}/recommendations`);
    },
    getMovieLatest() {
        return client.get(`movie/latest`);
    },
    async getMovieRandom() {
        const { data } = await api.getMovieLatest();

        const id = Math.floor(Math.random() * data.id);
        return api.getMovie(id);
    },
    getMoviePopular(page = 1, region = 'RU') {
        return client.get(`movie/popular?page=${page}&region=${region}`);
    },
    getMovieVideos(id) {
        return client.get(`movie/${id}/videos`);
    },
};

module.exports = api;
