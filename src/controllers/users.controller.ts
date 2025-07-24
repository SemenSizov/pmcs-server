import { Request, Response, NextFunction } from 'express';
import {
    getUsers as get_users,
    addUser as add_user,
    deleteUser as delete_user,
    updateUser as update_user,
} from '../services/user.service';

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const users = await get_users();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const addUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await add_user(req.body);
        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await update_user(req.body);
        res.status(200).send();
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await delete_user(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
