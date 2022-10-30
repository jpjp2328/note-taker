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
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))  
);

// GET Route for retrieving all the notes as JSON
app.get('/api/notes', (req, res) => {
    console.log(`${req.method} request received for Notes`);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw(err);
        res.json(JSON.parse(data));
    });
}); 

// POST Route 
app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received to add a Note`);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);
        let newNote = req.body;
        
        newNote.id = uuid();
        notes.push(newNote);
        
        fs.writeFile('./db/db.json', JSON.stringify(notes), 'utf8', (err) => {
            if (err) throw err;
            console.log('Updated Notes');
        });
    });
});

app.listen(PORT, () => 
  console.log(`App listening on Port ${PORT}`)
);
