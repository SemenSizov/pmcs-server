import { Request, Response, NextFunction } from 'express';
import {
    getUnits as get_units,
    addUnit as add_unit,
    deleteUnit as delete_unit,
    updateUnit as update_unit,
} from '../services/equipment-units.service';

export const getUnits = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const users = await get_units();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const addUnit = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await add_unit(req.body);
        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

export const updateUnit = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await update_unit(req.body);
        res.status(200).send();
    } catch (error) {
        next(error);
    }
};

export const deleteUnit = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await delete_unit(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
