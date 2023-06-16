// src/routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Rota para criar uma nova propriedade
router.post('/', propertyController.createProperty);

// Rota para listar todas as propriedades
router.get('/', propertyController.getAllProperties);

// Rota para obter os detalhes de uma propriedade específica
router.get('/:id', propertyController.getPropertyById);

// Rota para atualizar os dados de uma propriedade existente
router.put('/:id', propertyController.updateProperty);

// Rota para excluir uma propriedade
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
