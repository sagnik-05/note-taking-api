const Note = require('../models/note');

class NoteService {
  constructor() {
    this.notes = [];
  }

  createNote(title, content, tags) {
    const newNote = new Note(title, content, tags);
    this.notes.push(newNote);
    return newNote;
  }

  getAllNotes() {
    return this.notes;
  }

  getNoteById(id) {
    return this.notes.find(note => note.id === id);
  }

  updateNote(id, updates) {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
      this.notes[noteIndex] = { ...this.notes[noteIndex], ...updates };
      return this.notes[noteIndex];
    }
    return null;
  }

  deleteNote(id) {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
      this.notes.splice(noteIndex, 1);
      return true;
    }
    return false;
  }

  addTags(id, newTags) {
    const note = this.getNoteById(id);
    if (note) {
      note.tags = [...new Set([...note.tags, ...newTags])];
      return note;
    }
    return null;
  }

  removeTags(id, tagsToRemove) {
    const note = this.getNoteById(id);
    if (note) {
      note.tags = note.tags.filter(tag => !tagsToRemove.includes(tag));
      return note;
    }
    return null;
  }

  queryNotes(queryString) {
    const queryFunction = new Function('tags', `return ${queryString}`);
    return this.notes.filter(note => {
      try {
        return queryFunction(note.tags);
      } catch (error) {
        return false;
      }
    });
  }
}

module.exports = new NoteService();