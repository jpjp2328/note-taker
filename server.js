const express = require('express');
const path = require('path');
const fs = require('fs');

// Helper method for generating unique IDs
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for index.html

// GET Route for notes.html

// GET Route for retrieving all the notes

// POST Route 

app.listen(PORT, () => 
  console.log(`App listening at http://localhost:${PORT}`)
);
