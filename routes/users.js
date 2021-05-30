const express = require('express');
const router = express.Router(); //brings in Router Object
const User = require('../models/User'); //bringing in model to call methods on it
const bcrypt = require('bcryptjs');
const passport = require('passport');
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');

//Login Page
router.get('/login', authController.getLogin);

//Register Page
router.get('/register', authController.getRegister);

// login handle; implements strategy
router.post('/login', authController.postLogin);

// Register handle
router.post('/register', authController.postRegister);

// logout handle
router.get('/logout', authController.logout);

module.exports = router;
