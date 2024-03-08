const express = require('express');
const app = express();
const helmet = require('helmet');
const { notFound, errorHandler } = require('../middlewares/error.handler');

app.use(express.json({ limit: '50mb' }));
app.use(helmet());

app.use(notFound);
app.use(errorHandler);

module.exports = app;
