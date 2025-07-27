import { RowDataPacket } from "mysql2";

export type Role = "admin" | "user";

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
};

// Тип для отриманих з бази даних користувачів
export interface UserDB extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  role: Role;
  is_active: boolean;
}

// Тип для вставки / оновлення користувачів у базу
export interface UserDBData {
  id: number;
  name: string;
  email: string;
  role: Role;
  is_active: boolean;
}

// Мапінг з БД до моделі
export const mapUserDBtoUser = (row: UserDB): User => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: row.role,
  isActive: row.is_active,
});

// Мапінг з моделі до формату для БД (без RowDataPacket)
export const mapUserToDbFormat  = (u: User): UserDBData => ({
  id: u.id,
  name: u.name,
  email: u.email,
  role: u.role,
  is_active: u.isActive,
});
