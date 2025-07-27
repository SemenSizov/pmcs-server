import { Request, Response, NextFunction } from 'express';
import {
    getTypes as get_types,
    addType as add_type,
    deleteType as delete_type,
    updateType as update_type,
} from '../services/equipment-types.service';
import { AuthRequest } from '../middlewares/auth';

export const getTypes = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const users = await get_types();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const addType = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        await add_type(req.body, req.user?.id!);
        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

export const updateType = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await update_type(req.body, req.user?.id!);
        res.status(200).send();
    } catch (error) {
        next(error);
    }
};

export const deleteType = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await delete_type(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
