const express = require('express');
const router = express.Router(); //brings in Router Object
const mainController = require('../controllers/main');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//index page as route is just root '/'
router.get('/', mainController.getIndex);

// dashboard route
router.get('/dashboard', ensureAuth, mainController.getDashboard);

module.exports = router;
