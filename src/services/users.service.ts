import {
  insertUser,
  selectAllUsers,
  deleteUser as deleteUserFromDb,
  updateUser as updateUserInDb,
  activateUser as activateUserInDb,
  deactivateUser as deactivateUserInDb,
  selectUserByEmail
} from '../db/users.db';

import type { User } from '../types/user';

export const getUsers = async (): Promise<User[]> => {
  return selectAllUsers();
};

export const addUser = async (user: User): Promise<void> => {
  await insertUser(user);
};

export const deleteUser = async (id: number): Promise<void> => {
  await deleteUserFromDb(id);
};

export const updateUser = async (user: User): Promise<void> => {
  await updateUserInDb(user);
};

export const activateUser = async (id: number): Promise<void> => {
  await activateUserInDb(id);
};

export const deactivateUser = async (id: number): Promise<void> => {
  await deactivateUserInDb(id);
};

export const getUserByEmail = async (email: string): Promise<User | undefined>=>{
    return selectUserByEmail(email)
}