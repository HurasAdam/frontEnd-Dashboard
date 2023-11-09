const express = require('express');
const router = express.Router();
const [requireAuth,authRole,authMembership]=require('../middleware/requireAuth')
noteActions= require('../controllers/noteActions')


router.use(requireAuth)

// router.use(requireMembership)
//patches
//pobieranie notatek
router.get('/',noteActions.getAllNotes);
router.get('/archived',requireAuth,noteActions.getArchived)
//pobieranie notatki
router.get('/:id',requireAuth,noteActions.getNote);
//zapisywanie notatek
router.post('/',requireAuth,noteActions.saveNote);
//edytowanie notatki
router.patch('/:id',requireAuth,authRole("admin","user"),authMembership,noteActions.updateNote);
//usuwanie notatek
router.delete('/:id',requireAuth,authRole("admin"),noteActions.deleteNote);

module.exports=router;