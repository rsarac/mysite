import mongoose from 'mongoose';

import { MONGODB_URI } from './env.js';

try {
  await mongoose.connect(MONGODB_URI);
  console.log(`Connected to database: ${mongoose.connection.host}`);
} catch (error) {
  console.error('Error connecting to database');
}

mongoose.connection.on('error', (err) => {
  console.error(`Database connection error: ${err}`);
});

export default mongoose;
