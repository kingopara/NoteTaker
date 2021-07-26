// dependencies
const fs = require('fs');
const path = require('path');

const express = require('express');
const PORT = process.env.PORT || 3009;
const app = express();

// connecting routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// use public folder to deliver front end
app.use(express.static('public'))

// using routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// server port/listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});