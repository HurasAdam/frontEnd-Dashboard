const express = require('express');
const router = express.Router();
const [requireAuth,authRole,authMembership]=require('../middleware/requireAuth')
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
router.put('/:id',authRole("admin","user"),authMembership,noteActions.updateNote);
//usuwanie notatek
router.delete('/:id',authRole("admin"),noteActions.deleteNote);

module.exports=router;