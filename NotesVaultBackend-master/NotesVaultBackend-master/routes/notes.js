const express = require('express');
const { getNotes, addNote, updateNote, deleteNote } = require('../controllers/notes');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const router=express.Router();


router.post('/addnote',isAuthenticated, addNote);
router.get('/getnotes',isAuthenticated, getNotes);
router.put('/updateNote/:id',isAuthenticated, updateNote);
router.delete('/deletenote/:id',isAuthenticated, deleteNote);




module.exports = router;
