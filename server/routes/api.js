const express = require('express');
const router = express.Router();
const [requireAuth,authRole]=require('../middleware/requireAuth')
noteActions= require('../controllers/noteActions')


router.use(requireAuth)

// router.use(requireMembership)
//patches
//pobieranie notatek
router.get('/',noteActions.getAllNotes);
//pobieranie notatki
router.get('/:id',noteActions.getNote);
//zapisywanie notatek
router.post('/',noteActions.saveNote);
//edytowanie notatki
router.put('/:id',noteActions.updateNote);
//usuwanie notatek
router.delete('/:id',noteActions.deleteNote);

module.exports=router;