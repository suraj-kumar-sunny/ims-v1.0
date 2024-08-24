import express from 'express';
import cookieParser from 'cookie-parser';
import handleError from './utils/errorHandler.js';
import notFound from './middleware/notFound.middleware.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();

app.use(express.json()); // for parsing application/json
app.use(cookieParser());

// Define routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use(notFound);
// Error handling middleware
app.use(handleError);

export default app;