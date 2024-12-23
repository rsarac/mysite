import { check, validationResult } from 'express-validator';

const userRegisterValidate = [
  check('email')
    .isEmail()
    .withMessage('Enter a valid email address')
    .trim()
    .normalizeEmail(),
  check('password')
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 chars long'),
  check('first_name')
    .not()
    .isEmpty()
    .withMessage('First name is required')
    .trim()
    .escape(),
  check('last_name')
    .not()
    .isEmpty()
    .withMessage('Last name is required')
    .trim()
    .escape(),
  (req, res, next) => {
    const results = validationResult(req);

    if (results.isEmpty()) {
      return next();
    }

    return res.status(422).json({
      status: 'fail',
      data: results,
      message: 'Register user validation failed',
    });
  },
];

const userLoginValidate = [
  check('email')
    .isEmail()
    .withMessage('Enter a valid email address')
    .trim()
    .normalizeEmail(),
  check('password').notEmpty(),
  (req, res, next) => {
    const results = validationResult(req);

    if (results.isEmpty()) {
      return next();
    }

    return res.status(422).json({
      status: 'fail',
      data: results,
      message: 'Login user validation failed',
    });
  },
];

export { userRegisterValidate, userLoginValidate };
