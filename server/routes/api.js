const express = require('express');
const router = express.Router();

noteActions= require('../Actions/noteActions')


//patches
//pobieranie notatek
router.get('/notes',noteActions.getAllNotes);
//pobieranie notatki
router.get('/notes/:id',noteActions.getNote);
//zapisywanie notatek
router.post('/notes',noteActions.saveNote);
//edytowanie notatki
router.put('/notes/:id',noteActions.updateNote);
//usuwanie notatek
router.delete('/notes/:id',noteActions.deleteNote);

module.exports=router;