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
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
