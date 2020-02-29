// Require Statements
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const PORT = process.env.PORT || 4000;

// Init Routes
const routes = require('./routes'); // Routes Module

// Init server
const app = express();

// ------------------- MIDDLEWARE

// Serve Public Assets
app.use(express.static(__dirname + '/public'));

// Init BodyParser
app.use(bodyParser.json());

// ------------------- VIEW ROUTES

app.use('/', routes.views);

// ------------------- API ROUTES

app.use('/api/v1', routes.api);

// API ERROR 404
app.use('/api/*', (req, res) => {
  res.status(404).json({status: 404, error: "Error 404: Resource Not Found"});
});

// HTML Error 404
app.use('*', (req, res) => {
  res.send('<h2>Error 404: Page Not Found</h2>');
});

// ------------------ START SERVER

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
