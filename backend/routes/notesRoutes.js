const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

router.post('/summarize-notes', notesController.summarizeNotes);

module.exports = router;
