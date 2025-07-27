import {
    MeterReadingDB,
    mapMeterReadingDBtoModel,
    MeterReadingInsertData,
    Filters,
    MeterReading,
} from '../types/meterReading';
import { queryOrThrow } from '../utils/db';

// 1. Вибірка з фільтрацією та пагінацією
export const selectMeterReadings = async (filters: Filters = {}) => {
    const { unitId, fromDate, toDate, limit = 20, offset = 0 } = filters;

    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (unitId) {
        conditions.push('unit_id = ?');
        params.push(unitId);
    }

    if (fromDate) {
        conditions.push('date >= ?');
        params.push(fromDate);
    }

    if (toDate) {
        conditions.push('date <= ?');
        params.push(toDate);
    }

    const whereClause = conditions.length
        ? `WHERE ${conditions.join(' AND ')}`
        : '';
    const query = `
    SELECT * FROM meters_readings
    ${whereClause}
    ORDER BY date DESC
    LIMIT ?
    OFFSET ?
  `;

    params.push(limit);
    params.push(offset);

    const rows = await queryOrThrow<MeterReadingDB[]>(query, params);
    return rows.map(mapMeterReadingDBtoModel);
};

// 2. Вставка нового запису
export const insertMeterReading = async (data: MeterReadingInsertData) => {
    const query = `
    INSERT INTO meters_readings (date, unit_id, hours, user_id, changed_by)
    VALUES (?, ?, ?, ?, ?)
  `;

    const { date, unit_id, hours, user_id, changed_by } = data;
    await queryOrThrow(query, [date, unit_id, hours, user_id, changed_by]);
};

export const getFilteredMeterReadings = async (
    filters: Filters,
    offset: number,
    limit: number,
): Promise<MeterReading[]> => {
    const conditions: string[] = [];
    const values: any[] = [];

    if (filters.unitId !== undefined) {
        conditions.push('unit_id = ?');
        values.push(filters.unitId);
    }

    if (filters.fromDate) {
        conditions.push('date >= ?');
        values.push(filters.fromDate);
    }

    if (filters.toDate) {
        conditions.push('date <= ?');
        values.push(filters.toDate);
    }

    const limitNum = Number(limit);
    const offsetNum = Number(offset);
    const whereClause =
        conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `SELECT * FROM meters_readings ${whereClause} ORDER BY date DESC LIMIT ${limitNum} OFFSET ${offsetNum}`;

    const rows = await queryOrThrow<MeterReadingDB[]>(query, values);
    return rows.map(mapMeterReadingDBtoModel);
};
