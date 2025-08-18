import { Router } from 'express';
import { getReadings, createReading, getLastReading, deleteReading } from '../controllers/meters-readings.controller';

const router = Router();

router.get('/', getReadings);
router.post('/', createReading);
router.get('/last/:id', getLastReading);
router.delete('/:id', deleteReading);

export default router;
