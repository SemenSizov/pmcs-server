import { Router } from 'express';
import {
  addLocation,
  getLocations,
  deleteLocation,
  updateLocation,
} from '../controllers/location.controller';

const router = Router();

router.get('/', getLocations);
router.post('/', addLocation);
router.put('/:id', updateLocation);
router.delete('/:id', deleteLocation);

export default router;