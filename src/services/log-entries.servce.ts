import { getLastLogEnrty, insertLogEntry, selectFilteredLogEntries } from '../db/log-entries.db';
import { LogEntry, LogEntryDTO, LogEntryFilters, LogEntryInsertData } from '../types/logEntry';
import { getUnits } from './equipment-units.service';
import { getProcedures } from './procedures.service';

export const getFilteredLogEntries = async (
    filters: LogEntryFilters = { limit: 20, offset: 30 },
): Promise<{ items: LogEntryDTO[]; total: number }> => {
    const result = await selectFilteredLogEntries(filters);
    const units = await getUnits();
    const procedures = await getProcedures();
    const items: LogEntryDTO[] = result.items.map((i) => {
        return {
            id: i.id!,
            date: i.date!,
            hours: i.hours!,
            procedure: procedures.find((p) => p.id === i.procedureId)!,
            unit: units.find((p) => p.id === i.unitId)!,
        };
    });
    return { items, total: result.total };
};

export const getLastLogEntry = async (unitId: number, procedureId: number) => {
    const lastReading = await getLastLogEnrty(unitId, procedureId);
    return lastReading ? lastReading[0] : { hours: 0, date: null };
};

export const addLogEntry = async (logEntry: LogEntry, userId: number) =>{
    const data: LogEntryInsertData = {
        date: logEntry.date,
        unit_id: logEntry.unitId,
        procedure_id: logEntry.procedureId,
        hours: logEntry.hours,
        user_id: userId
    }
    await insertLogEntry(data)
}