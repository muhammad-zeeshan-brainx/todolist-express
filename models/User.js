const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'password can not be blank'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'password and confirm password must match',
    },
  },
  passwordChangedAt: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.isPasswordChanged = (JWTTimestamp) => {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
