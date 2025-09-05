import {
    MeterReadingDB,
    mapMeterReadingDBtoModel,
    MeterReadingInsertData,
    MetersReadingFilters,
    MeterReading,
} from '../types/meterReading';
import { queryOrThrow } from '../utils/db';
import { selectAllUnits } from './equipment-units-db';

// 1. Вибірка з фільтрацією та пагінацією
export const selectMeterReadings = async (filters: MetersReadingFilters = {}) => {
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
    ORDER BY id DESC
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

    const { date, unit_id, hours, changed_by } = data;
    await queryOrThrow(query, [date, unit_id, hours, changed_by, changed_by]);
};

export const getFilteredMeterReadings = async (
    filters: MetersReadingFilters,
    offset: number,
    limit: number,
): Promise<{ items: MeterReading[]; total: number }> => {
    const conditions: string[] = [];
    const values: any[] = [];

    if (filters.unitId !== undefined) {
        conditions.push('unit_id = ?');
        values.push(filters.unitId);
    }

    if (filters.locationId !== undefined) {
        const units = await selectAllUnits();
        const filteredIds = units
            ?.filter((u) => Number(u.location_id) === filters.locationId)
            .map((u) => u.id);
        if (filteredIds?.length != undefined && filteredIds?.length > 0) {
            conditions.push(`unit_id in (${filteredIds?.join(',')})`);
        }
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
    const totalQuery = `SELECT COUNT(*) as total FROM meters_readings ${whereClause}`;
    const rTotal = (await queryOrThrow(totalQuery, values)) as unknown as {
        total: number;
    }[];
    const total = rTotal[0].total;
    const items = rows.map(mapMeterReadingDBtoModel);
    return { items: items, total: total };
};

export const getLastReadingById = async (unitId: number) => {
    const row = await queryOrThrow(
        `SELECT hours, date FROM meters_readings WHERE unit_id = ? ORDER BY date DESC LIMIT 1`,
        [unitId],
    );
    return row as unknown as { hours: number; date: string }[] | undefined;
};

export const deleteReadingById = async (id: number) => {
    await queryOrThrow(`DELETE FROM meters_readings WHERE id = ?`, [id])
}
