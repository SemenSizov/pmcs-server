import { Router } from 'express';
import { getReadings, createReading, getLastReading } from '../controllers/meters-readings.controller';

const router = Router();

router.get('/', getReadings);
router.post('/', createReading);
router.get('/last/:id', getLastReading)

export default router;
