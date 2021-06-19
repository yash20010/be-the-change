const express = require('express');
const router = express.Router(); //brings in Router Object
const mainController = require('../controllers/main');
const expensesController = require('../controllers/accounts');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//index page as route is just root '/'
router.get('/', ensureGuest, mainController.getIndex);

// dashboard route
router.get('/dashboard', ensureAuth, expensesController.getAccount);

module.exports = router;
