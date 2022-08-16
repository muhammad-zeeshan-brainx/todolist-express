require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'Failed to create new user',
      error: error,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password are provided
  if (!email || !password) {
    res.status(400).json({
      status: 'Fail',
      message: 'please enter email and password',
    });
  }

  //check if user exits and password is correct
  try {
    const user = await User.findOne({ email: email }).select('+password');
    if (!user || !(await user.isPasswordCorrect(password, user.password))) {
      res
        .status(401)
        .json({ status: 'Fail', message: 'incorrect email or password' });
      return;
    }

    //if everything ok, send the token
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Fail',
      message: 'something went wrong',
    });
  }
};
