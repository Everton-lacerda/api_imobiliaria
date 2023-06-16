// homeController.js
const propertyService = require('../services/propertyService');


// Controlador para a página inicial
exports.homePage = async (req, res) => {
  try {
    // Obtenha os dados das propriedades do serviço
    const properties = await propertyService.getProperties();

    // Renderize a página inicial com os dados das propriedades
    res.json(properties)
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar as propriedades');
  }
};
