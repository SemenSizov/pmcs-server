import express from 'express';
import locationRoutes from './routes/locations.routes';
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/users.routes'
import equipmentTypeRoutes from './routes/equipment-types.routes'
import equipmentUnitRoutes from './routes/equipment-units.routes'
import proceduresRoutes from './routes/procedures.routes'
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
app.use('/api/users', userRoutes)
app.use('/api/equipment-types', equipmentTypeRoutes)
app.use('/api/equipment-units', equipmentUnitRoutes)
app.use('/api/procedures', proceduresRoutes)

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;