// src/controllers/propertyController.js
const Property = require("../models/propertyModel");
const { createPropertySchema } = require("../validations/propertyValidation");

const createProperty = async (req, res) => {
  try {
    const { error } = createPropertySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const property = new Property(req.body);
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Failed to create property" });
  }
};
const getAllProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Página atual (padrão: 1)
    const limit = parseInt(req.query.limit) || 10; // Limite de itens por página (padrão: 10)
    const sortField = req.query.sort || 'createdAt'; // Campo de ordenação (padrão: createdAt)
    const sortOrder = req.query.order === 'desc' ? -1 : 1; // Ordem de classificação (padrão: ascendente)

    const skip = (page - 1) * limit; // Número de itens para pular

    const query = {};

    // Verifica os parâmetros de pesquisa avançada
    if (req.query.minPrice) {
      query.price = { $gte: parseInt(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      query.price = { ...query.price, $lte: parseInt(req.query.maxPrice) };
    }
    if (req.query.minBedrooms) {
      query.bedrooms = { $gte: parseInt(req.query.minBedrooms) };
    }
    if (req.query.location) {
      query.location = { $regex: req.query.location, $options: 'i' }; // Pesquisa por localização com case-insensitive
    }
    if (req.query.propertyType) {
      query.propertyType = req.query.propertyType;
    }

    const totalProperties = await Property.countDocuments(query); // Total de propriedades no banco de dados

    const properties = await Property.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ [sortField]: sortOrder }); // Consulta com paginação, ordenação e pesquisa avançada

    res.json({
      page,
      limit,
      totalProperties,
      totalPages: Math.ceil(totalProperties / limit),
      properties,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await Property.findById(id);
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch property" });
  }
};

const updateProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProperty = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedProperty) {
      res.json(updatedProperty);
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update property" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;
    await Property.findByIdAndDelete(id);
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete property" });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
