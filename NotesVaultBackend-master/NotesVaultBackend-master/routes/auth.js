const express = require('express');
const router=express.Router();
const {login,logout,register,getProfile} = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
router.post('/login', login);
router.get('/logout', isAuthenticated, logout);
router.get('/profile', isAuthenticated, getProfile);
router.post('/register',register);

module.exports = router;