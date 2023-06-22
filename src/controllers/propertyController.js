const Property = require("../models/propertyModel");
const { createPropertySchema } = require("../validations/PropertyValidation");

const PropertyController = {
  async getAllProperties(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortField = req.query.sort || 'createdAt';
      const sortOrder = req.query.order === 'desc' ? -1 : 1;

      const skip = (page - 1) * limit;

      const query = {};

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
        query.location = { $regex: req.query.location, $options: 'i' };
      }
      if (req.query.propertyType) {
        query.propertyType = req.query.propertyType;
      }
      const totalProperties = await Property.countDocuments(query);

      const properties = await Property.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ [sortField]: sortOrder });

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
  },

  async getPropertyById(req, res) {
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
  },

  async createProperty(req, res) {
    try {
      const { error } = createPropertySchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details });
      }

      const imageUrls = req.files.map((file) => file.filename);

      const property = new Property({
        title: req.body.title,
        description: req.body.description,
        propertyType: req.body.propertyType,
        price: req.body.price,
        bathrooms: req.body.bathrooms,
        bedrooms: req.body.bedrooms,
        garage: req.body.garage,
        isLand: req.body.isLand,
        location: req.body.location,
        otherProperty: req.body.otherProperty,
        imageUrl: imageUrls
      });

      await property.save();
      res.json(property);
    } catch (error) {
      console.log('error', error)
      res.status(500).json({ error: "Failed to create property" });
    }
  },

  async updateProperty(req, res) {
    try {
      const id = req.params.id;
      const imageUrls = req.files.map((file) => file.filename);
      const updatedProperty = await Property.findByIdAndUpdate(id, {
        title: req.body.title,
        description: req.body.description,
        propertyType: req.body.propertyType,
        price: req.body.price,
        bathrooms: req.body.bathrooms,
        bedrooms: req.body.bedrooms,
        garage: req.body.garage,
        isLand: req.body.isLand,
        location: req.body.location,
        otherProperty: req.body.otherProperty,
        imageUrl: imageUrls
      }, {
        new: true
      });

      if (updatedProperty) {
        res.json(updatedProperty);
      } else {
        res.status(404).json({ message: "Property not found", });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to update property", error });
    }
  },

  async deleteProperty(req, res) {
    try {
      const id = req.params.id;
      await Property.findByIdAndDelete(id);
      res.json({ message: "Property deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete property" });
    }
  },
};

module.exports = PropertyController;
