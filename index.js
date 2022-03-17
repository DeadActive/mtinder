const express = require('express');
const morgan = require('morgan');
const router = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(router);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
