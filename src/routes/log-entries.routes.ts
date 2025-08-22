import { Router } from 'express';
import { createLogEntry, deleteLogEntry, getLastLog, getLogEntries } from '../controllers/log-entries.controller';
import { requireAdmin } from '../middlewares/auth';

const router = Router();

router.get('/', getLogEntries);
router.post('/', createLogEntry);
router.get('/last/:id', getLastLog);
router.delete('/:id', requireAdmin, deleteLogEntry);

export default router;
