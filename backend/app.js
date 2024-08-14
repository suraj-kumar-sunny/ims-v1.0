import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import companyRoutes from './routes/company.routes.js';
import roleRoutes from './routes/role.routes.js';
import handleError from './utils/errorHandler.js';
import notFound from './middlewares/notFound.middleware.js';

const app = express();

app.use(express.json()); // for parsing application/json
app.use(cookieParser());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/roles', roleRoutes);
app.use(notFound);
// Error handling middleware
app.use(handleError);

export default app;