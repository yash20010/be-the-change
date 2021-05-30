const express = require('express');
const router = express.Router(); //brings in Router Object
const authController = require('../controllers/auth');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Login Page
router.get('/login', ensureGuest, authController.getLogin);

//Register Page
router.get('/register', ensureGuest, authController.getRegister);

// login handle; implements strategy
router.post('/login', ensureGuest, authController.postLogin);

// Register handle
router.post('/register', authController.postRegister);

// logout handle
router.get('/logout', authController.logout);

module.exports = router;
