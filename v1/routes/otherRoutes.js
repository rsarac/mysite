import express from 'express';

import * as userVerify from '../middleware/userVerify.js';

const otherRouter = express.Router();

otherRouter.get('/', (req, res) => {
  try {
    res.status(200).json({
      data: [],
      message: 'GET handler for routes, [other]',
    });
  } catch (err) {
    res.status(500).json({
      message: `Error handling routes, [other]: ${err.message}`,
    });
  }
});

otherRouter.get('/user', userVerify.userSessionVerify, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'User session verified',
  });
});

export default otherRouter;
