import { Request, Response, NextFunction } from 'express';
import { getMeterReadings, addMeterReading } from '../services/meters-readings.service';
import { AuthRequest } from '../middlewares/auth';
import { MeterReading } from '../types/meterReading';

export const getReadings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { unitId, date, page = '1', pageSize = '20' } = req.query;

    const filters = {
      unitId: unitId ? Number(unitId) : undefined,
      date: typeof date === 'string' ? date : undefined,
    };

    const pagination = {
      page: Number(page),
      pageSize: Number(pageSize),
    };

    const readings = await getMeterReadings(filters, pagination);
    res.status(200).json(readings);
  } catch (error) {
    next(error);
  }
};

export const createReading = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const data = req.body as Omit<MeterReading, 'id' | 'createdAt' | 'updatedAt' | 'changedBy'>;

    await addMeterReading(data, userId);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};
