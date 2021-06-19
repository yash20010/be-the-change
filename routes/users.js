const express = require('express');
const router = express.Router(); //brings in Router Object
const authController = require('../controllers/auth');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const expensesController = require('../controllers/accounts');

//Login Page
router.get('/login', ensureGuest, authController.getLogin);

//Register Page
router.get('/register', ensureGuest, authController.getRegister);

// login handle; implements strategy
router.post('/login', authController.postLogin);

// Register handle
router.post('/register', authController.postRegister);

// logout handle
router.get('/logout', authController.logout);

// expense(s) handle
router.post('/accounts', ensureAuth, expensesController.postExpenses);

module.exports = router;
