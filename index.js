const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const prisma = require('./db');

const app = express();
const port = 8000;

app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send({});
});

Object.entries(routes).forEach(([key, route]) => {
    console.log(`Register route /${key}`);
    app.use(`/${key}`, route);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
