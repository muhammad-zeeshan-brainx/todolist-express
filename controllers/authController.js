const User = require('../models/User');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Fail',
      message: 'Failed to create new user',
      error: error,
    });
  }
};
