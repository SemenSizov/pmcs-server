import { Router } from "express";
import locationRoutes from './locations.routes'
import usersRoutes from './users.routes'
import equipmentTypesRoutes from './equipment-types.routes'
import equipmentUnitsRoutes from './equipment-units.routes'
import proceduresRoutes from './procedures.routes'
import { requireAdmin } from "../middlewares/auth";

const router = Router()
router.use(requireAdmin)
router.use('/locations', locationRoutes);
router.use('/users', usersRoutes)
router.use('/equipment-types', equipmentTypesRoutes)
router.use('/equipment-units', equipmentUnitsRoutes)
router.use('/procedures', proceduresRoutes)

export default router