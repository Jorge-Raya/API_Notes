const fs = require('fs');

//add new note
const addNote = (title, body) => {
    const notes = loadNotes(); //load notes from files

    //review duplicates in the file
    const duplicateNote = notes.find(
        (note) => note.title === title
    );

    if (!duplicateNote){
        notes.push(
            {
                title: title,
                body: body
            }
        );

        saveNotes(notes);
        console.log('New Note added!');
    } else {
        console.log('Note title taken!');
    }


}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch (e){
        console.log("Error catched in crud.js about: "+e);
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find(
        (note) => note.title === title
    );

    if(note){
        console.log('Note Title = ' + note.title);
        console.log('Content = '+note.body);
    }else{
        console.log('Note not found!');
    }
}

const listNodes = () => {
    const notes = loadNotes();
    console.log('The Notes');

    notes.forEach(
        (note) => {
            console.log(note.title+' - '+note.body)
        }
    );
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(
        (note) => note.title !== title
    );

    if(notes.length > notesToKeep.length){
        console.log('Note Removed');
        saveNotes(notesToKeep);
    }else {
        console.log('Note not Found');
    }
}

module.exports = {
    addNote: addNote,
    readNote: readNote,
    listNodes: listNodes,
    removeNote: removeNote
}