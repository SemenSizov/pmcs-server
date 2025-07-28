import { RowDataPacket } from 'mysql2';
import { EquipmentUnit } from '../types/equipmentUnit';
import { queryOrThrow } from '../utils/db';

interface EquipmentUnitRDP extends RowDataPacket {
    id: number;
    serial: string;
    equipment_type_id: string;
    location_id: string;
}

export const selectAllUnits = async (): Promise<
    EquipmentUnitRDP[] | undefined
> => {
    const query = 'SELECT * FROM equipment_units';
    const units = await queryOrThrow<EquipmentUnitRDP[]>(query);
    return units;
};

export const insertUnit = async (
    equipnemtUnit: EquipmentUnit,
    changedBy: number,
) => {
    const { serial, locationId, equipmentTypeId } = equipnemtUnit;
    const query =
        'INSERT INTO equipment_units (serial, equipment_type_id, location_id, changed_by) VALUES (?, ?, ?, ?)';
    await queryOrThrow(query, [serial, equipmentTypeId, locationId, changedBy]);
};

export const deleteUnit = async (id: number) => {
    const query = 'DELETE FROM equipment_units WHERE id = ?';
    await queryOrThrow(query, [id]);
};

export const updateUnit = async (unit: EquipmentUnit, changedBy: number) => {
    const { id, serial, locationId, equipmentTypeId } = unit;
    const query =
        'UPDATE equipment_units SET serial = ?, location_id=?, equipment_type_id=?, changed_by=? WHERE id = ?';
    await queryOrThrow(query, [
        serial,
        locationId,
        equipmentTypeId,
        changedBy,
        id,
    ]);
};
