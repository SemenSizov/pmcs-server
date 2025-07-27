// src/services/meters-readings.service.ts

import {
    getFilteredMeterReadings,
    insertMeterReading,
} from '../db/meters-readings.db';
import {
    Filters,
    mapModelToMeterReadingInsert,
    Pagination,
    type MeterReading,
} from '../types/meterReading';

export const getMeterReadings = async (
    filters: Filters = {},
    pagination = { page: 1, pageSize: 20 },
): Promise<MeterReading[]> => {
    const {page, pageSize} = pagination
    const  limit  = pageSize;
    const offset = (page - 1) * pageSize;
    return await getFilteredMeterReadings(filters, offset, limit);
};

export const addMeterReading = async (
    reading: Omit<MeterReading, 'id' | 'createdAt' | 'updatedAt' | 'changedBy'>,
    userId: number,
): Promise<void> => {
    const data = mapModelToMeterReadingInsert(reading, userId);
    await insertMeterReading(data);
};
