// homeRoutes.js
const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

// Rota para a página inicial
router.get('/', homeController.homePage);

module.exports = router;
