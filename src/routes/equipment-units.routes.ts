import { Router } from "express";
import { addUnit, getUnits, deleteUnit, updateUnit } from "../controllers/equipment-units.controller";

const router = Router()

router.get('/', getUnits)
router.post('/', addUnit)
router.delete('/:id', deleteUnit)
router.put('/:id', updateUnit)

export default router