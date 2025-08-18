import { Router } from 'express';
import { getReadings, createReading, getLastReading, deleteReading } from '../controllers/meters-readings.controller';
import { requireAdmin } from '../middlewares/auth';

const router = Router();

router.get('/', getReadings);
router.post('/', createReading);
router.get('/last/:id', getLastReading);
router.delete('/:id', requireAdmin, deleteReading);

export default router;
