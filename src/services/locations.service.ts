import {
    selectAllLocations,
    insertLocation,
    deleteLocation as delete_location,
    updateLocation as update_location,
} from '../db/locations.db';
import type { LocationDTO } from '../types/location';
import { getUnits } from './equipment-units.service';

export const getLocations = async (): Promise<LocationDTO[]> => {
    const locations = await selectAllLocations();
    const units = await getUnits();
    const locationsDTO = locations.map((l) => {
        return { ...l, units: units.filter((u) => u.location.id === l.id) };
    });
    if (!locations) {
        return [];
    } else {
        return locationsDTO;
    }
};

export const addLocation = async (location: LocationDTO, changedBy: number) => {
    const { name } = location;
    return insertLocation(name, changedBy);
};

export const deleteLocation = async (id: number) => {
    return delete_location(id);
};

export const updateLocation = async (location: LocationDTO, changedBy: number) => {
    return update_location(location, changedBy);
};
