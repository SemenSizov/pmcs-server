import { pool } from './pool.db';
import type { EquipmentType } from '../models/equipmentType';
import { logger } from '../utils/logger';
import { RowDataPacket } from 'mysql2';

interface EquipmentTypeRDP extends RowDataPacket {
    id: number;
    name: string;
}

export const selectAllTypes = async (): Promise<
    EquipmentType[] | undefined
> => {
    try {
        const [users] = await pool.execute<EquipmentTypeRDP[]>(
            'SELECT * FROM equipment_types',
        );
        return users;
    } catch (e) {
        logger.logError(`Failed to select all equipment types. ${e}`);
    }
};

export const insertType = async (name: string) => {
    try {
        await pool.execute('INSERT INTO equipment_types (name) VALUES (?)', [
            name,
        ]);
    } catch (e) {
        logger.logError(`Failed to insert equipment type. ${e}`);
    }
};

export const deleteType = async (id: string) => {
    try {
        await pool.execute('DELETE FROM equipment_types WHERE id = ?', [id]);
    } catch (e) {
        logger.logError(`Failed to delete equipment type.  id = ${id}. ${e}`);
    }
};

export const updateType = async (type: EquipmentType) => {
    const { id, name } = type;
    try {
        await pool.execute('UPDATE equipment_types SET name = ? WHERE id = ?', [
            name,
            id,
        ]);
    } catch (e) {
        logger.logError(`Failed to insert  equipment type. ${e}`);
    }
};
