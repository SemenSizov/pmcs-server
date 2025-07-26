import { selectAllTypes } from '../db/equipment-types.db';
import {
    insertUnit,
    selectAllUnits,
    deleteUnit as delete_unit,
    updateUnit as update_unit,
} from '../db/equipment-units-db';
import { selectAllLocations } from '../db/locations.db';
import { EquipmentUnit, EquipmentUnitDTO } from '../models/equipmentUnit';

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
                },
            };
            return unitDTO;
        });
        return unitDTOs;
    }
};

export const addUnit = async (unit: EquipmentUnit) => {
    return insertUnit(unit);
};

export const deleteUnit = async (id: string) => {
    return delete_unit(id);
};

export const updateUnit = async (unit: EquipmentUnit) => {
    return update_unit(unit);
};
