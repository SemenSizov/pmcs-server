import { pool } from './pool';
import { Location, LocationDTO } from '../models/location';
import { logger } from '../utils/logger';


export const insertLocation = async (name: string) => {
    try {
        return pool.execute('INSERT INTO location (name) VALUES (?)', [name]);
    } catch (e) {
        logger.logError(`Failed to store location ${e}`);
        throw e;
    }
};

export const deleteLocation = async (locationId: number) => {
    try {
        return pool.execute('DELETE FROM location where id = ?', [locationId]);
    } catch (e) {
        logger.logError(`Failed to delete location, id=${locationId}. ${e}`);
    }
};

export const selectAllLocations = async () => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM location');
        return rows as Location[];
    } catch (e) {
        logger.logError(`Failed to get all locations ${e}`);
        throw e;
    }
};
