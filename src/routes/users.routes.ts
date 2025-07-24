import { Router } from "express";
import { addUser, getUsers, deleteUser, updateUser } from "../controllers/users.controller";

const router = Router()

router.get('/', getUsers)
router.post('/', addUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)

export default router