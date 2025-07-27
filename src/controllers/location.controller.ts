import { Request, Response, NextFunction } from 'express';
import {
    getLocations as get_locations,
    updateLocation as update_location,
    addLocation as add_location,
    deleteLocation as delete_location,
} from '../services/locations.service';
import { AuthRequest } from '../middlewares/auth';
// Create an item
export const addLocation = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        await add_location(req.body, req.user?.id!);
        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

// Read all items
export const getLocations = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const locations = await get_locations();
        res.status(200).json(locations);
    } catch (error) {
        next(error);
    }
};

export const updateLocation = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        await update_location(req.body, req.user?.id!);
        res.status(200).send();
    } catch (error) {
        next(error);
    }
};

export const deleteLocation = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = parseInt(req.params.id, 10);
        await delete_location(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
