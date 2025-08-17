import { selectAllTypes } from '../db/equipment-types.db';
import {
    insertUnit,
    selectAllUnits,
    deleteUnit as delete_unit,
    updateUnit as update_unit,
} from '../db/equipment-units-db';
import { selectAllLocations } from '../db/locations.db';
import { EquipmentUnit, EquipmentUnitDTO } from '../types/equipmentUnit';

export const getUnits = async (): Promise<EquipmentUnitDTO[]> => {
    const types = await selectAllTypes();
    const locations = await selectAllLocations();
    const units = await selectAllUnits();
    if (!units) {
        return [];
    } else {
        const unitDTOs = units.map((u) => {
            const loc = locations.find((l) => l.id == +u.location_id)!;
            const type = types?.find((t) => t.id === +u.equipment_type_id)!;
            const unitDTO: EquipmentUnitDTO = {
                id: u.id,
                serial: u.serial,
                location: {
                    id: loc.id,
                    name: loc.name,
                },
                equipmentType: {
                    id: type.id,
                    name: type.name,
                    hasHourmeter: !!type.has_hourmeter,
                },
            };
            return unitDTO;
        });
        return unitDTOs;
    }
};

export const addUnit = async (unit: EquipmentUnit, changedBy:number) => {
    return insertUnit(unit, changedBy);
};

export const deleteUnit = async (id: number) => {
    return delete_unit(id);
};

export const updateUnit = async (unit: EquipmentUnit, changedBy:number) => {
    return update_unit(unit, changedBy);
};
