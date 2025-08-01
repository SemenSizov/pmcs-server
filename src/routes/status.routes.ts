import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';

const router = Router();

const isAlive = async (req: Request, res: Response) => {
    res.send(`I'm alive!`)
};

router.get('/isAlive', isAlive);

export default router
