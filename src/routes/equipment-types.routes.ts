import { Router } from "express";
import { addType, getTypes, deleteType, updateType } from "../controllers/equipment-types.controller";

const router = Router()

router.get('/', getTypes)
router.post('/', addType)
router.delete('/:id', deleteType)
router.put('/:id', updateType)

export default router