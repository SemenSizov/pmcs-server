import { pool } from './pool.db';
import { Location } from '../types/location';
import { logger } from '../utils/logger';
import { RowDataPacket } from 'mysql2';
import { queryOrThrow } from '../utils/db';

interface LocationRDP extends RowDataPacket {
    id: number;
    name: string;
}

export const insertLocation = async (name: string, changed_by: number) => {
    const query = 'INSERT INTO locations (name, changed_by) VALUES (?, ?)';
    await queryOrThrow(query, [name, changed_by]);
};

export const deleteLocation = async (locationId: number) => {
    const query = 'DELETE FROM locations where id = ?';
    await queryOrThrow(query, [locationId]);
};

export const selectAllLocations = async () => {
    const query = 'SELECT * FROM locations';
    const locations = await queryOrThrow<LocationRDP[]>(query);
    return locations;
};

export const updateLocation = async (
    location: Location,
    changed_by: number,
) => {
    const { id, name } = location;
    const query = 'UPDATE locations SET name=(?), changed_by=(?) where id=(?)';
    await queryOrThrow(query, [name, changed_by, id]);
};
