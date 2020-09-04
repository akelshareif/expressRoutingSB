const express = require('express');
const itemRoutes = require('./itemRoutes');
const { items } = require('./fakeDB');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/items', itemRoutes);

module.exports = app;
