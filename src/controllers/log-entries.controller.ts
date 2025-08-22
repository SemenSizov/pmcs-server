import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { LogEntry, LogEntryFilters } from '../types/logEntry';
import {
    addLogEntry,
    deleteEntry,
    getFilteredLogEntries,
    getLastLogEntry,
} from '../services/log-entries.servce';

export const getLogEntries = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const {
            unitId,
            fromDate,
            toDate,
            page = '1',
            pageSize = '20',
            locationId,
            procedureId,
        } = req.query;

        const filters: LogEntryFilters = {
            unitId: unitId ? Number(unitId) : undefined,
            fromDate: typeof fromDate === 'string' ? fromDate : undefined,
            toDate: typeof toDate === 'string' ? toDate : undefined,
            locationId: locationId ? Number(locationId) : undefined,
            procedureId: procedureId ? Number(procedureId) : undefined,
            limit: pageSize ? Number(pageSize) : 20,
            offset:
                pageSize && page ? (Number(page) - 1) * Number(pageSize) : 0,
        };
        const logEntries = await getFilteredLogEntries(filters);
        res.status(200).json(logEntries);
    } catch (error) {
        next(error);
    }
};

export const createLogEntry = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const data = req.body as LogEntry;
        await addLogEntry(data, userId);
        res.status(201).send();
    } catch (error) {
        next(error);
    }
};

export const getLastLog = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const unitId = parseInt(req.params.unit_id);
        const procedureId = parseInt(req.params.procedure_id);
        const reading = await getLastLogEntry(unitId, procedureId);
        res.json(reading);
    } catch (e) {
        next(e);
    }
};

export const deleteLogEntry = async (
    req: AuthRequest,
    res: Response, 
    next: NextFunction,   
) => {
    try {
    const id = parseInt(req.params.id);
    await deleteEntry(id);
    res.status(204).send();
    } catch (error) {
        next(error);
    }   
}