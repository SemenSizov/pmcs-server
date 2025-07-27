import { Router } from 'express';
import { getReadings, createReading } from '../controllers/meters-readings.controller';

const router = Router();

router.get('/', getReadings);
router.post('/', createReading);

export default router;
