import { Router } from "express";
import { googleAuth } from "../controllers/auth.controller";

const router = Router()

router.post('/google/callback',googleAuth )

export default router