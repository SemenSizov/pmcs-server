import { pool } from './pool.db';
import { logger } from '../utils/logger';
import { RowDataPacket } from 'mysql2';
import { Procedure } from '../models/procedure';

interface ProcedureRDP extends RowDataPacket {
    id: number;
    name: string;
    type: 'period' | 'hours',
    hours?: number
    period?: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual';
    equipment_type_id: number;
}

export const selectAllProcedures = async (): Promise<ProcedureRDP[] | undefined> => {
    try {
        const [procedures] = await pool.execute<ProcedureRDP[]>('SELECT * FROM procedures');
        return procedures;
    } catch (e) {
        logger.logError(`Failed to select all procedures. ${e}`);
    }
};

export const insertProcedure = async (procedure: Procedure) => {
    const { name, type, hours, period, equipment_type_id } = procedure;
    try {
        await pool.execute(
            `INSERT INTO procedures (name, type, hours, period, equipment_type_id) VALUES (?, ?, ?, ?, ?)`,
            [name, type, hours, period, equipment_type_id],
        );
    } catch (e) {
        logger.logError(`Failed to insert procedure. ${e}`);
    }
};

export const deleteProcedure = async (id: string) => {
    try {
        await pool.execute('DELETE from PROCEDURES where id = ?', [id]);
    } catch (e) {
        logger.logError(`Failed to delete procedure. id = ${id}. ${e}`);
    }
};

export const updateProcedure = async (procedure: Procedure) => {
    const {id, name, type, hours, period, equipment_type_id } = procedure;
    try {
        await pool.execute(
            'UPDATE procedures SET name = ?, type=?, hours=?, period=?, equipment_type_id=? WHERE id = ?',
            [name, type, hours, period, equipment_type_id, id],
        );
    } catch (e) {
        logger.logError(`Failed to update procedure. ${e}`);
    }
};
