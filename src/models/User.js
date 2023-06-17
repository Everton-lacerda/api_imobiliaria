const mongoose = require('mongoose');
const crypto = require('crypto');

const UserRolesEnum = require('./UserRolesEnum')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRolesEnum),
    default: UserRolesEnum.COMUM,
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
