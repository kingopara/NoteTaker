const router = require('express').Router();
const { filterByQuery, findById, createNewNote, validateNote, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');

// route to notes api
router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// api route to post notes
router.post('/notes', (req, res) => {
    //console.log(req.body);
    req.body.id = notes.length.toString();
    //validation
    if (!validateNote(req.body)) {
        res.status(400).send('The note is properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// route to delete note
router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    res.json(true);
});

module.exports = router;