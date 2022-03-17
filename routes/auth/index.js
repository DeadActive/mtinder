const express = require('express');
const router = express.Router();

const self = require('./self');
const google = require('./google');

const routes = {
    '': self,
    google,
};

Object.entries(routes).forEach(([key, route]) => {
    console.log(`Register route /${key}`);
    router.use(`/${key}`, route);
});

module.exports = router;
