import { pool } from './pool.db';
import type { Role, User } from '../models/user';
import { logger } from '../utils/logger';
import { RowDataPacket } from 'mysql2';

interface UserRDP extends RowDataPacket {
    id: number;
    name: string;
    email: string;
    role: Role;
}

export const selectUserByEmail = async (
    email: string,
): Promise<User | undefined> => {
    try {
        const [rows] = await pool.execute<UserRDP[]>(
            'SELECT * FROM users WHERE email = ?',
            [email],
        );
        const user = rows[0];
        return user;
    } catch (e) {
        logger.logError(`Failed to find user by email , email=${email}. ${e}`);
    }
};

export const selectUserById = async (id: number): Promise<User | undefined> => {
    try {
        const [rows] = await pool.execute<UserRDP[]>(
            'SELECT * FROM users WHERE id = ?',
            [id],
        );
        const user = rows[0];
        return user;
    } catch (e) {
        logger.logError(`Failed to find user by email , id=${id}. ${e}`);
    }
};

export const selectAllUsers = async (): Promise<User[] | undefined> => {
    try {
        const [users] = await pool.execute<UserRDP[]>('SELECT * FROM users');
        return users;
    } catch (e) {
        logger.logError(`Failed to select all users. ${e}`);
    }
};

export const insertUser = async (name: string, email: string, role: Role) => {
    try {
        await pool.execute(
            'INSERT INTO users (name, email, role) VALUES (?,?,?)',
            [name, email, role],
        );
    } catch (e) {
        logger.logError(`Failed to insert user. ${e}`);
    }
};

export const deleteUser = async (id: string) => {
    try {
        await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    } catch (e) {
        logger.logError(`Failed to delete user.  id = ${id}. ${e}`);
    }
};

export const updateUser = async (user: User) => {
    const { id, name, email, role } = user;
    try {
        await pool.execute(
            'UPDATE users SET name = ?, role= ?, email = ? WHERE id = ?',
            [name, role, email, id],
        );
    } catch (e) {
        logger.logError(`Failed to insert user. ${e}`);
    }
};
