const noteService = require('../services/noteService');

exports.createNote = (req, res) => {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const newNote = noteService.createNote(title, content, tags);
    res.status(201).json({
      message: 'Note created successfully',
      note: {
        title: newNote.title,
        content: newNote.content,
        tags: newNote.tags
      }
    });
  };

  exports.getAllNotes = (req, res) => {
    const notes = noteService.getAllNotes();
    const simplifiedNotes = notes.map(note => ({
      title: note.title,
      content: note.content,
      tags: note.tags
    }));
    res.json(simplifiedNotes);
  };

exports.getNoteById = (req, res) => {
  const note = noteService.getNoteById(req.params.id);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.json(note);
};

exports.updateNote = (req, res) => {
  const updatedNote = noteService.updateNote(req.params.id, req.body);
  if (!updatedNote) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.json(updatedNote);
};

exports.deleteNote = (req, res) => {
  const deleted = noteService.deleteNote(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.status(204).send();
};

exports.addTags = (req, res) => {
  const { tags } = req.body;
  const updatedNote = noteService.addTags(req.params.id, tags);
  if (!updatedNote) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.json(updatedNote);
};

exports.removeTags = (req, res) => {
  const { tags } = req.body;
  const updatedNote = noteService.removeTags(req.params.id, tags);
  if (!updatedNote) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.json(updatedNote);
};

exports.queryNotes = (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }
  const filteredNotes = noteService.queryNotes(query);
  res.json(filteredNotes);
};