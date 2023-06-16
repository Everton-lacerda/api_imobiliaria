const express = require('express');
const router = express.Router();

const PropertyController = require('../controllers/PropertyController');
const ContactController = require('../controllers/ContactController');
const UserController = require('../controllers/UserController');

const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas
router.get('/api/properties/', PropertyController.getAllProperties);
router.get('/api/properties/:id', PropertyController.getPropertyById);
router.post('/api/properties/', PropertyController.createProperty);
router.put('/api/properties/:id', PropertyController.updateProperty);
router.delete('/api/properties/:id', PropertyController.deleteProperty);

router.post('/api/contact', ContactController.sendContactMessage);

router.post('/api/register', UserController.register);
router.post('/api/login', UserController.login);

// Rotas protegidas adicionar authMiddleware a rota

module.exports = router;
