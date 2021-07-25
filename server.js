const fs = require('fs');
const path = require('path');

const express = require('express');
const PORT = process.env.PORT || 3009;
const app = express();

// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'))

// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);
const { notes } = require('./db/db.json');

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    return filteredResults
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

// function createNewNote(body, notesArray) {
//     const note = body;
//     notesArray.push(note);
//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify({ notes: notesArray }, null, 2)
//     );
//     return note;
// }

app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});