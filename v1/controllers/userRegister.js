import User from '../models/userModel.js';

const userRegister = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const newUser = new User({
      email,
      password,
      first_name,
      last_name,
    });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({
        status: 'fail',
        data: [],
        message: `User ${email} already exists`,
      });

    const savedUser = await newUser.save();
    const { role, ...user_data } = savedUser.toObject();

    delete user_data.password;

    res.status(200).json({
      status: 'success',
      data: [user_data],
      message: 'Account created',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      code: 500,
      data: [],
      message: err.message,
    });
  }

  res.end();
};

export default userRegister;