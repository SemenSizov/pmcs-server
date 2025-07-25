import { Router } from "express";
import { addProcedure, getProcedures, deleteProcedure, updateProcedure } from "../controllers/procedures.controller";

const router = Router()

router.get('/', getProcedures)
router.post('/', addProcedure)
router.delete('/:id', deleteProcedure)
router.put('/:id', updateProcedure)

export default router