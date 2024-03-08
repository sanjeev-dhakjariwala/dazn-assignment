const express = require('express');
const app = express();
const helmet = require("helmet")

app.use(express.json({ limit: '50mb' }));
app.use(helmet())

module.exports = app;
