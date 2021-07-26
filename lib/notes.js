const fs = require("fs");
const path = require("path");

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

// function to create note
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

// function to validate note
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false
    }
    return true;
}

// function to delete note
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i]

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            break;
        }
    }
}

// export functions
module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
    deleteNote
};