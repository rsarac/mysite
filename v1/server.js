import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';
// ...importing this opens the connection to the database...
import mongoose from './config/db.js';

import userAuthRouter from './routes/userAuthRoutes.js';
import otherRouter from './routes/otherRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/v1/auth', userAuthRouter);
app.use('/v1', otherRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
