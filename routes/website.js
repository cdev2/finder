const express = require('express');
const router = express.Router();
const controller = require('../controllers/website.controller');

router.post('/search', controller.searchResults);
router.post('/create', controller.create);

module.exports = router;