import { pool } from './pool.db';
import { logger } from '../utils/logger';
import { RowDataPacket } from 'mysql2';
import { Procedure } from '../types/procedure';
import { queryOrThrow } from '../utils/db';

interface ProcedureRDP extends RowDataPacket {
    id: number;
    name: string;
    type: 'period' | 'hours';
    hours?: number;
    period?: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual';
    equipment_type_id: number;
}

export const selectAllProcedures = async (): Promise<
    ProcedureRDP[] | undefined
> => {
    const query = 'SELECT * FROM procedures';
    const procedures = await queryOrThrow<ProcedureRDP[]>(query);
    return procedures;
};

export const insertProcedure = async (
    procedure: Procedure,
    changedBy: number,
) => {
    const { name, type, hours, period, equipment_type_id } = procedure;
    const query = `INSERT INTO procedures (name, type, hours, period, equipment_type_id, changed_by) VALUES (?, ?, ?, ?, ?, ?)`;
    await queryOrThrow(query, [
        name,
        type,
        hours,
        period,
        equipment_type_id,
        changedBy,
    ]);
};

export const deleteProcedure = async (id: string) => {
    const query = 'DELETE from procedures where id = ?';
    await queryOrThrow(query, [id]);
};

export const updateProcedure = async (
    procedure: Procedure,
    changedBy: number,
) => {
    const { id, name, type, hours, period, equipment_type_id } = procedure;
    const query =
        'UPDATE procedures SET name = ?, type=?, hours=?, period=?, equipment_type_id=?, changed_by=? WHERE id = ?';
    await queryOrThrow(query, [
        name,
        type,
        hours,
        period,
        equipment_type_id,
        changedBy,
        id,
    ]);
};
