import { ProcedureDTO } from './procedure';
import { EquipmentUnitDTO } from './equipmentUnit';
import { RowDataPacket } from 'mysql2';

export type LogEntry = {
    id: number;
    date: string; // ISO string 'YYYY-MM-DD'
    hours: number | null;
    procedureId: number;
    unitId: number;
    userId: number;
};

export interface LogEntryDB extends RowDataPacket {
    id: number;
    date: string;
    hours: number | null;
    procedure_id: number;
    unit_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export type LogEntryInsertData = {
    date: string;
    hours: number | null;
    procedure_id: number;
    unit_id: number;
    user_id: number;
};

export type LogEntryDTO = {
    id: number;
    date: string;
    hours: number | null;
    procedure: ProcedureDTO;
    unit: EquipmentUnitDTO;
};

export type LogEntryFilters = {
    unitId?: number;
    locationId?: number;
    procedureId?: number;
    fromDate?: string;
    toDate?: string;
    limit?: number;
    offset?: number;
};

export const mapLogEntryDBtoModel = (row: LogEntryDB): LogEntry => {
    return {
        id: row.id,
        date: row.date,
        hours: row.hours,
        procedureId: row.procedure_id,
        unitId: row.unit_id,
        userId: row.user_id,
    };
};
