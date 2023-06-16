// propertyService.js
const Property = require('../models/propertyModel');

// Obtenha as propriedades do banco de dados ou qualquer outra fonte de dados
exports.getProperties = async () => {
  try {
    // Aqui você pode implementar a lógica para obter as propriedades
    // do banco de dados ou qualquer outra fonte de dados

    // Por enquanto, retornaremos dados fictícios
    const properties = [
      { id: 1, title: 'Propriedade 1', price: 100000 },
      { id: 2, title: 'Propriedade 2', price: 150000 },
      { id: 3, title: 'Propriedade 3', price: 200000 },
    ];

    return properties;
  } catch (error) {
    throw new Error('Erro ao obter as propriedades');
  }
};
