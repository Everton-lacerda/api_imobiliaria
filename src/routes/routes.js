const express = require('express');
const router = express.Router();

const UserRolesEnum = require('../models/UserRolesEnum');
const permissionsMiddleware = require('../middlewares/permissionsMiddleware');

const PropertyController = require('../controllers/PropertyController');
const ContactController = require('../controllers/ContactController');
const UserController = require('../controllers/UserController');

const authMiddleware = require('../middlewares/authMiddleware');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Rotas públicas
router.get('/api/properties/', PropertyController.getAllProperties);
router.get('/api/properties/:id', PropertyController.getPropertyById);
router.post('/api/properties/', upload.array('imageUrl'), PropertyController.createProperty);

router.put('/api/properties/:id', upload.array('imageUrl'), PropertyController.updateProperty);
router.delete('/api/properties/:id', PropertyController.deleteProperty);

router.post('/api/contact', ContactController.sendContactMessage);

router.post('/api/register', upload.single('photo'), UserController.register);
router.post('/api/login', UserController.login);

router.get('/api/users', authMiddleware, UserController.getAllUsers);
router.get('/api/users/:id', authMiddleware, UserController.getUserById);
router.put('/api/users/:id', authMiddleware, UserController.updateUser);
router.delete('/api/users/:id', authMiddleware, UserController.deleteUser);

router.get('/api/roles', (req, res) => {
    res.json('roles')
});

router.post('/api/users/forgot-password', UserController.forgotPassword);
router.post('/api/users/reset-password', UserController.resetPassword);

router.get('/admin', authMiddleware, permissionsMiddleware([UserRolesEnum.ADMIN]), (req, res) => {
    // Lógica para renderizar a interface de administração aqui
});

module.exports = router;
