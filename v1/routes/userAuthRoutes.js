import express from 'express';

import * as userValidate from '../middleware/userValidate.js';
import userRegister from '../controllers/userRegister.js';
import userLogin from '../controllers/userLogin.js';

const userAuthRouter = express.Router();

userAuthRouter.post(
  '/register',
  userValidate.userRegisterValidate,
  userRegister
);

userAuthRouter.post('/login', userValidate.userLoginValidate, userLogin);

export default userAuthRouter;
