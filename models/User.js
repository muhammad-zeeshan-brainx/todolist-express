const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name must be present'],
  },
  email: {
    type: String,
    required: [true, 'email can not be empty'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide valid email address'],
  },
  password: {
    type: String,
    required: [true, 'password can not be blank'],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, 'password can not be blank'],
    minlength: 8,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
