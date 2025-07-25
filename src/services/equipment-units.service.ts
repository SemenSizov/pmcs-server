import { selectAllTypes } from '../db/equipmentTypeDb';
import {
    insertUnit,
    selectAllUnits,
    deleteUnit as delete_unit,
    updateUnit as update_unit,
} from '../db/equipmentUnitDb';
import { selectAllLocations } from '../db/locationDb';
import { Unit, UnitDTO } from '../models/unit';

export const getUnits = async (): Promise<UnitDTO[]> => {
    const types = await selectAllTypes();
    const locations = await selectAllLocations();
    const units = await selectAllUnits();
    console.log(locations)
    console.log(types)
    if (!units) {
        return [];
    } else {
        const unitDTOs = units.map((u) => {
            const loc = locations.find((l) => l.id == +u.location_id)!;
            const type = types?.find((t) => t.id === +u.unit_type_id)!;
            const unitDTO: UnitDTO = {
                id: u.id,
                serial: u.serial,
                location: {
                    id: loc.id,
                    name: loc.name,
                },
                unitType: {
                    id: type.id,
                    name: type.name,
                },
            };
            return unitDTO;
        });
        return unitDTOs;
    }
};

export const addUnit = async (unit: Unit) => {
    return insertUnit(unit);
};

export const deleteUnit = async (id: string) => {
    return delete_unit(id);
};

export const updateUnit = async (unit: Unit) => {
    return update_unit(unit);
};
