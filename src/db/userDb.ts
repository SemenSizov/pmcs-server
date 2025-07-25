import { pool } from './pool';
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
            'select * FROM user where email = ?',
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
            'select * FROM user where id = ?',
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
        const [users] = await pool.execute<UserRDP[]>('select * FROM user');
        return users;
    } catch (e) {
        logger.logError(`Failed to select all users. ${e}`);
    }
};

export const insertUser = async (name: string, email: string, role: Role) => {
    try {
        const [rows] = await pool.execute<UserRDP[]>(
            'insert into user (name, email, role) values (?,?,?)',
            [name, email, role],
        );
        const user = rows[0];
        return user;
    } catch (e) {
        logger.logError(`Failed to insert user. ${e}`);
    }
};

export const deleteUser = async (id: string) => {
    try {
        const [rows] = await pool.execute<UserRDP[]>(
            'delete from user where id = ?',
            [id],
        );
    } catch (e) {
        logger.logError(`Failed to delete user.  id = ${id}. ${e}`);
    }
};

export const updateUser = async (user: User) => {
    const { id, name, email, role } = user;
    try {
        await pool.execute<UserRDP[]>(
            'UPDATE user SET name = ?, role= ?, email = ? WHERE id = ?',
            [name, role, email, id],
        );
    } catch (e) {
        logger.logError(`Failed to insert user. ${e}`);
    }
};
