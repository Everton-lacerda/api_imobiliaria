const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imageUrl: [{
    type: String,
    required: false
  }],
  garage: {
    type: Number,
    default: 0,
  },
  isLand: {
    type: Boolean,
    default: false,
  },
  otherProperty: {
    type: String,
    default: '',
  },
  seller: {
    type: Boolean,
    required: false,
  },
  cpfCnpj: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  neighborhood: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  area: {
    type: Number,
    required: false,
  },
  suites: {
    type: Number,
    required: false,
  },
  pools: {
    type: Number,
    required: false,
  },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
