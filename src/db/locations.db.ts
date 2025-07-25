import { pool } from './pool.db';
import { Location } from '../models/location';
import { logger } from '../utils/logger';
import { RowDataPacket } from 'mysql2';

interface LocationRDP extends RowDataPacket {
    id: number;
    name: string;
}

export const insertLocation = async (name: string) => {
    try {
        return pool.execute('INSERT INTO locations (name) VALUES (?)', [name]);
    } catch (e) {
        logger.logError(`Failed to store location ${e}`);
        throw e;
    }
};

export const deleteLocation = async (locationId: number) => {
    try {
        return pool.execute('DELETE FROM locations where id = ?', [locationId]);
    } catch (e) {
        logger.logError(`Failed to delete location, id=${locationId}. ${e}`);
    }
};

export const selectAllLocations = async () => {
    try {
        const [rows] = await pool.execute<LocationRDP[]>(
            'SELECT * FROM locations',
        );
        return rows;
    } catch (e) {
        logger.logError(`Failed to get all locations ${e}`);
        throw e;
    }
};

export const updateLocation = async (location: Location) => {
    const { id, name } = location;
    try {
        await pool.execute('UPDATE locations SET name=(?) where id=(?)', [
            name,
            id,
        ]);
    } catch (e) {
        logger.logError(`Failed to update location, id=${id}. ${e}`);
        throw e;
    }
};
