import { pool } from './pool';
import type { UnitType } from '../models/unitType';
import { logger } from '../utils/logger';
import { RowDataPacket } from 'mysql2';

interface UnitTypeRDP extends RowDataPacket {
    id: number;
    name: string;
}


export const selectAllTypes = async (): Promise<UnitType[] | undefined> => {
    try {
        const [users] = await pool.execute<UnitTypeRDP[]>(
            'select * FROM unit_type',
        );
        return users;
    } catch (e) {
        logger.logError(`Failed to select all equipment types. ${e}`);
    }
};

export const insertType = async (name: string) => {
    try {
        const [rows] = await pool.execute<UnitTypeRDP[]>(
            'INSERT INTO unit_type (name) values (?)',
            [name],
        );
        const user = rows[0];
        return user;
    } catch (e) {
        logger.logError(`Failed to insert equipment type. ${e}`);
    }
};

export const deleteType = async (id: string) => {
    try {
        const [rows] = await pool.execute<UnitTypeRDP[]>(
            'delete from unit_type where id = ?',
            [id],
        );
    } catch (e) {
        logger.logError(`Failed to delete equipment type.  id = ${id}. ${e}`);
    }
};

export const updateType = async (type: UnitType) => {
    const { id, name } = type;
    try {
        await pool.execute<UnitTypeRDP[]>(
            'UPDATE unit_type SET name = ? WHERE id = ?',
            [name, id],
        );
    } catch (e) {
        logger.logError(`Failed to insert  equipment type. ${e}`);
    }
};
