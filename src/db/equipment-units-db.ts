import { pool } from './pool.db';
import { logger } from '../utils/logger';
import { RowDataPacket } from 'mysql2';
import { EquipmentUnit } from '../types/equipmentUnit';

interface EquipmentUnitRDP extends RowDataPacket {
    id: number;
    serial: string;
    equipment_type_id: string;
    location_id: string;
}

export const selectAllUnits = async (): Promise<EquipmentUnitRDP[] | undefined> => {
    try {
        const [users] = await pool.execute<EquipmentUnitRDP[]>('SELECT * FROM equipment_units');
        return users;
    } catch (e) {
        logger.logError(`Failed to select all equipment units. ${e}`);
        throw (e)
    }
};

export const insertUnit = async (equipnemtUnit: EquipmentUnit, changedBy: number) => {
    const { serial, locationId, equipmentTypeId } = equipnemtUnit;
    try {
        await pool.execute(
            'INSERT INTO equipment_units (serial, equipment_type_id, location_id, changed_by) VALUES (?, ?, ?, ?)',
            [serial, equipmentTypeId, locationId, changedBy],
        );
    } catch (e) {
        logger.logError(`Failed to insert equipment unit. ${e}`);
    }
};

export const deleteUnit = async (id: string) => {
    try {
        await pool.execute('DELTE FROM equipment_units WHERE id = ?', [id]);
    } catch (e) {
        logger.logError(`Failed to delete equipment unit.  id = ${id}. ${e}`);
    }
};

export const updateUnit = async (unit: EquipmentUnit, changedBy: number) => {
    const { id, serial, locationId, equipmentTypeId } = unit;
    try {
        await pool.execute<EquipmentUnitRDP[]>(
            'UPDATE equipment_units SET serial = ?, location_id=?, equipment_type_id=?, changed_by=? WHERE id = ?',
            [serial, locationId, equipmentTypeId, changedBy, id],
        );
    } catch (e) {
        logger.logError(`Failed to update equipment unit. ${e}`);
    }
};
