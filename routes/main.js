const express = require('express');
const router = express.Router(); //brings in Router Object
const mainController = require('../controllers/main');
const expensesController = require('../controllers/expenses');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//index page as route is just root '/'
router.get('/', mainController.getIndex);

// dashboard route
router.get('/dashboard', ensureAuth, expensesController.getExpenses);

module.exports = router;
