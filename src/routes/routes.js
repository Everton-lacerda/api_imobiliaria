const express = require('express');
const router = express.Router();

const UserRolesEnum = require('../models/UserRolesEnum');
const permissionsMiddleware = require('../middlewares/permissionsMiddleware');

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

router.get('/api/users', authMiddleware, UserController.getAllUsers);
router.put('/api/users/:id', authMiddleware, UserController.updateUser);
router.delete('/api/users/:id', authMiddleware, UserController.deleteUser);

router.post('/api/users/forgot-password', UserController.forgotPassword);
router.post('/api/users/reset-password', UserController.resetPassword);

router.get('/admin-only', authMiddleware, permissionsMiddleware([UserRolesEnum.ADMIN]), (req, res) => {
    // Lógica da rota protegida aqui
});

module.exports = router;
