import { Request, Response, NextFunction } from 'express';
import {
    getProcedures as get_procedures,
    addProcedure as add_procedure,
    deleteProcedure as delete_procedure,
    updateProcedure as update_procedure,
} from '../services/procedures.service';
import { AuthRequest } from '../middlewares/auth';

export const getProcedures = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const procedures = await get_procedures();
        res.status(200).json(procedures);
    } catch (error) {
        next(error);
    }
};

export const addProcedure = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        await add_procedure(req.body, req.user?.id!);
        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

export const updateProcedure = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        await update_procedure(req.body, req.user?.id!);
        res.status(200).send();
    } catch (error) {
        next(error);
    }
};

export const deleteProcedure = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await delete_procedure(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
