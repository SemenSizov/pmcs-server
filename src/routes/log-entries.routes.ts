import { Router } from 'express';
import { createLogEntry, getLastLog, getLogEntries } from '../controllers/log-entries.controller';

const router = Router();

router.get('/', getLogEntries);
router.post('/', createLogEntry);
router.get('/last/:id', getLastLog)

export default router;
