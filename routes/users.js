const express = require('express');
const router = express.Router(); //brings in Router Object
const authController = require('../controllers/auth');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const expensesController = require('../controllers/expenses');

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

// get expenses
router.get('/:id', ensureAuth, expensesController.getExpenses);

// expense(s) handle
router.post('/expenses', ensureAuth, expensesController.postExpenses);

module.exports = router;
