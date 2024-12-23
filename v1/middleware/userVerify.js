import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';
import { JWT_SECRET } from '../config/env.js';

const userSessionVerify = async (req, res, next) => {
  try {
    const sessionCookie = req.cookies.SessionID;

    if (!sessionCookie)
      return res.status(401).json({
        status: 'fail',
        data: [],
        message: 'Not authorized',
      });
    jwt.verify(sessionCookie, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 'fail',
          data: [],
          message: 'Session has expired',
        });
      }
      const { id } = decoded;
      const findUser = await User.findById(id);
      const { password, ...user_data } = findUser.toObject();
      req.user = user_data;
    });
    next();
  } catch (err) {
    res.status(500).json({
      status: 'error',
      code: 500,
      data: [],
      message: err.message,
    });
  }
};

export { userSessionVerify };
