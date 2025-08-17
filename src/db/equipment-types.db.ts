import type { EquipmentType } from '../types/equipmentType';
import { RowDataPacket } from 'mysql2';
import { queryOrThrow } from '../utils/db';

interface EquipmentTypeRDP extends RowDataPacket {
    id: number;
    name: string;
    has_hourmeter: boolean;
}

export const selectAllTypes = async (): Promise<
    EquipmentTypeRDP[] | undefined
> => {
    const query = 'SELECT * FROM equipment_types';
    const types = await queryOrThrow<EquipmentTypeRDP[]>(query);
    return types;
};

export const insertType = async (name: string, changedBy: number, hasHourmeter: boolean) => {
    const query =
        'INSERT INTO equipment_types (name, changed_by, has_hourmeter) VALUES (?, ?, ?)';
    await queryOrThrow(query, [name, changedBy, hasHourmeter ? 1 : 0]);
};

export const deleteType = async (id: string) => {
    const query = 'DELETE FROM equipment_types WHERE id = ?';
    await queryOrThrow(query, [id]);
};

export const updateType = async (type: EquipmentType, changedBy: number) => {
    const { id, name, hasHourmeter } = type;
    const query =
        'UPDATE equipment_types SET name = ?, changed_by = ?, has_hourmeter = ? WHERE id = ?';
    await queryOrThrow(query, [name, changedBy, hasHourmeter ? 1 : 0, id]);
};
