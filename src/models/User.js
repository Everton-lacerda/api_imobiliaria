const mongoose = require('mongoose');
const crypto = require('crypto');

const UserRolesEnum = require('./UserRolesEnum')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }, 
  role: {
    type: String,
    enum: Object.values(UserRolesEnum),
    default: UserRolesEnum.COMUM,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
  },
});

userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpires = Date.now() + 3600000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;


