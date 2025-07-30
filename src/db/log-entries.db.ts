import {
    LogEntryFilters,
    LogEntryDB,
    LogEntryInsertData,
    mapLogEntryDBtoModel,
} from '../types/logEntry';
import { queryOrThrow } from '../utils/db';
import { selectAllUnits } from './equipment-units-db';

export const selectFilteredLogEntries = async (filters: LogEntryFilters) => {
    const { fromDate, toDate, unitId, procedureId, locationId, limit, offset } =
        filters;

    let where = 'WHERE 1=1';
    const params: any[] = [];

    if (fromDate) {
        where += ' AND date >= ?';
        params.push(fromDate);
    }
    if (toDate) {
        where += ' AND date <= ?';
        params.push(toDate);
    }
    if (unitId) {
        where += ' AND unit_id = ?';
        params.push(unitId);
    }
    if (procedureId) {
        where += ' AND procedure_id = ?';
        params.push(procedureId);
    }
    if (locationId && !unitId) {
        const units = await selectAllUnits();
        const filteredIds = units
            ?.filter((u) => Number(u.location_id) === filters.locationId)
            .map((u) => u.id);
        if (filteredIds?.length != undefined && filteredIds?.length > 0) {
            where += ` AND unit_id in (${filteredIds?.join(',')})`;
        } else {
            return { items: [], total: 0 };
        }
    }

    const query = `SELECT * FROM log_entries ${where} ORDER BY date DESC LIMIT ${limit} OFFSET ${offset}`;
    const rows = await queryOrThrow<LogEntryDB[]>(query, params);
    const totalQuery = `SELECT COUNT(*) as total FROM log_entries ${where}`;
    const rTotal = (await queryOrThrow(totalQuery, params)) as unknown as {
        total: number;
    }[];
    const total = rTotal[0].total;
    const items = rows.map(mapLogEntryDBtoModel);
    return { items, total };
};

export const insertLogEntry = async (data: LogEntryInsertData) => {
    const { date, hours, unit_id, procedure_id, user_id } = data;
    const query = `
    INSERT INTO log_entries (date, hours,unit_id, procedure_id, user_id)
    VALUES (?, ?, ?, ?, ?)
  `;
    await queryOrThrow(query, [date, hours, unit_id, procedure_id, user_id]);
};

export const getLastLogEnrty = async (unitId: number, procedureId: number) => {
    const row = await queryOrThrow(
        `SELECT hours, date FROM log_entries WHERE unit_id = ? AND procedure_id = ? ORDER BY date DESC LIMIT 1`,
        [unitId, procedureId],
    );
    return row as unknown as { hours: number; date: string }[] | undefined;
};
