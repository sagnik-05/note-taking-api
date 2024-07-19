const express = require('express');
const noteController = require('../controllers/noteController');

const router = express.Router();

router.post('/', noteController.createNote);
router.get('/', noteController.getAllNotes);
router.get('/query', noteController.queryNotes);
router.get('/:id', noteController.getNoteById);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.put('/:id/tags', noteController.addTags);
router.delete('/:id/tags', noteController.removeTags);

module.exports = router;