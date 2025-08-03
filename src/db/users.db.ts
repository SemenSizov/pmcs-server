import {
    mapUserDBtoUser,
    mapUserToDbFormat,
    type User,
    type UserDB,
} from '../types/user';
import { queryOrThrow } from '../utils/db';

export const selectUserByEmail = async (
    email: string,
): Promise<User | undefined> => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const rows = await queryOrThrow<UserDB[]>(query, [email]);
    return rows[0] ? mapUserDBtoUser(rows[0]) : undefined;
};

export const selectUserById = async (id: number): Promise<User | undefined> => {
    const query = 'SELECT * FROM users WHERE id = ?';
    const rows = await queryOrThrow<UserDB[]>(query, [id]);
    return rows[0] ? mapUserDBtoUser(rows[0]) : undefined;
};

export const selectAllUsers = async (): Promise<User[]> => {
    const query = 'SELECT * FROM users WHERE is_active = TRUE';
    const rows = await queryOrThrow<UserDB[]>(query);
    return rows.map(mapUserDBtoUser);
};

export const insertUser = async (user: User) => {
    const { name, email, role, isActive = 1 } = user;
    const query =
        'INSERT INTO users (name, email, role, is_active) VALUES (?, ?, ?, ?)';
    await queryOrThrow(query, [name, email, role, isActive]);
};

export const deleteUser = async (id: number) => {
    const query = 'DELETE FROM users WHERE id = ?';
    await queryOrThrow(query, [id]);
};

export const updateUser = async (user: User) => {
    const { id, name, email, role, is_active = 1 } = mapUserToDbFormat(user);
    const query =
        'UPDATE users SET name = ?, role = ?, email = ?, is_active = ? WHERE id = ?';
    await queryOrThrow(query, [name, role, email, is_active, id]);
};

export const deactivateUser = async (id: number) => {
    const query = 'UPDATE users SET is_active = FALSE WHERE id = ?';
    await queryOrThrow(query, [id]);
};

export const activateUser = async (id: number) => {
    const query = 'UPDATE users SET is_active = TRUE WHERE id = ?';
    await queryOrThrow(query, [id]);
};
