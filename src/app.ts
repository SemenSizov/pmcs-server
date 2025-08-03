import express from 'express';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import meterReadingsRoutes from './routes/meters-readings.routes';
import logEntriesRoutes from './routes/log-entries.routes';
import statusRoutes from './routes/status.routes';
import { errorHandler } from './middlewares/errorHandler';
import { verifyToken } from './middlewares/auth';
import cors from 'cors';
import config from './config/config';
import { logger } from './utils/logger';

const app = express();

app.use(
    cors({
        origin: config.frontendUrl, // або '*' для дозволу всім
        credentials: true, // якщо використовуєш cookies або Authorization header
    }),
);
app.use(express.json());

// Routes
app.use('/api/status', statusRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/meters-readings', verifyToken, meterReadingsRoutes);
app.use('/api/log-entries', verifyToken, logEntriesRoutes);

app.use('/api/admin',verifyToken, adminRoutes);
// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
