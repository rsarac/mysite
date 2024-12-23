import dotenv from 'dotenv';

dotenv.config();

const { PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRE } = process.env;

export { PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRE };
