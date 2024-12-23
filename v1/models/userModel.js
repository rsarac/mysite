import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_EXPIRE } from '../config/env.js';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      max: 25,
    },
    first_name: {
      type: String,
      required: true,
      max: 25,
    },
    last_name: {
      type: String,
      required: true,
      max: 25,
    },
    role: {
      type: String,
      required: true,
      select: false,
      default: 'public',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.generateJWT = function () {
  let payload = {
    id: this._id,
  };
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

export default mongoose.model('User', userSchema);
