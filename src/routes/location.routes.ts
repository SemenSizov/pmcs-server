import { Router } from 'express';
import {
  createLocation,
  getLocations,
  deleteLocation
  // getItemById,
  // updateItem,
  // deleteItem,
} from '../controllers/location.controller';

const router = Router();

router.get('/', getLocations);
// router.get('/:id', getItemById);
router.post('/', createLocation);
// router.put('/:id', updateItem);
router.delete('/:id', deleteLocation);

export default router;