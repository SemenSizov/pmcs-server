import { Router } from 'express';
import {
    addUser,
    getUsers,
    deleteUser,
    updateUser,
    activateUser,
    deactivateUser,
} from '../controllers/users.controller';

const router = Router();

router.get('/', getUsers);
router.post('/', addUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.patch('/:id/activate', activateUser);
router.patch('/:id/deactivate', deactivateUser);

export default router;
