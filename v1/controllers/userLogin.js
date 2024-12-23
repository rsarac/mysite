import bcrypt from 'bcrypt';

import User from '../models/userModel.js';

const userLogin = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user)
      return res.status(401).json({
        status: 'fail',
        data: [],
        message: 'Invalid email or password',
      });

    const isPasswordValid = await bcrypt.compare(
      `${req.body.password}`,
      user.password
    );

    if (!isPasswordValid)
      return res.status(401).json({
        status: 'fail',
        data: [],
        message: 'Invalid email or password',
      });

    let options = {
      maxAge: 20 * 60 * 1000, // 20 minute expiry
      httpOnly: true, // cookie only accessible by the server
      secure: true,
      sameSite: 'None',
    };

    const token = user.generateJWT();

    res.cookie('SessionID', token, options);
    res.status(200).json({
      status: 'success',
      data: [],
      message: 'User logged in',
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

export default userLogin;
