import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { getDashboardData } from '../services/dashboard.service';

// Read all items
export const getDashboard = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const data = await getDashboardData();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};
