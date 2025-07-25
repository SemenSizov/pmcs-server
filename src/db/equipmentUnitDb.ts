import { pool } from './pool';
import { logger } from '../utils/logger';
import { RowDataPacket } from 'mysql2';
import { Unit } from '../models/unit';

interface UnitRDP extends RowDataPacket {
    id: number;
    serial: string;
    unit_type_id: string;
    location_id: string;
}

export const selectAllUnits = async (): Promise<UnitRDP[] | undefined> => {
    try {
        const [users] = await pool.execute<UnitRDP[]>('select * FROM unit');
        return users;
    } catch (e) {
        logger.logError(`Failed to select all equipment units. ${e}`);
    }
};

export const insertUnit = async (unit: Unit) => {
    const { serial, locationId, unitTypeId } = unit;
    try {
        await pool.execute(
            'INSERT INTO unit (serial, unit_type_id, location_id) values (?, ?, ?)',
            [serial, unitTypeId, locationId],
        );
    } catch (e) {
        logger.logError(`Failed to insert equipment unit. ${e}`);
    }
};

export const deleteUnit = async (id: string) => {
    try {
        await pool.execute('delete from unit where id = ?', [id]);
    } catch (e) {
        logger.logError(`Failed to delete equipment unit.  id = ${id}. ${e}`);
    }
};

export const updateUnit = async (type: Unit) => {
    const { id, serial: serialNumber, locationId, unitTypeId } = type;
    try {
        await pool.execute<UnitRDP[]>(
            'UPDATE unit SET serial = ?, location_id=?, unit_type_id=? WHERE id = ?',
            [serialNumber, locationId, unitTypeId, id],
        );
    } catch (e) {
        logger.logError(`Failed to update equipment unit. ${e}`);
    }
};
