const express = require('express');
const errorMiddleware = require('../middlewares/errorHandler');
const router = require('../routes');

const app = express();

app.use(express.json());
app.use(router);
app.use(errorMiddleware);

module.exports = app;
