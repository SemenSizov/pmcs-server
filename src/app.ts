import express from 'express';
import locationRoutes from './routes/locationRoutes';
import authRoutes from './controllers/authController'
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
import verifyToken from './middlewares/verifyToken';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // або '*' для дозволу всім
  credentials: true, // якщо використовуєш cookies або Authorization header
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes)
app.use(verifyToken)
app.use('/api/locations', locationRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;