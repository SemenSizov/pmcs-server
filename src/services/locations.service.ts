import {
    selectAllLocations,
    insertLocation,
    deleteLocation as delete_location,
    updateLocation as update_location,
} from '../db/locationDb';
import type { LocationDTO } from '../models/location';
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

export const addLocation = async (location: LocationDTO) => {
    const { name } = location;
    return insertLocation(name);
};

export const deleteLocation = async (id: number) => {
    return delete_location(id);
};

export const updateLocation = async (location: LocationDTO) => {
    return update_location(location);
};
