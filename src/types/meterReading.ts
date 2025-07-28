import { RowDataPacket } from 'mysql2';

export type MeterReading = {
  id: number;
  date: string; // ISO string 'YYYY-MM-DD'
  unitId: number;
  hours: number;
  userId: number;
  changedBy: number;
  createdAt: string;
  updatedAt: string;
};

export interface MeterReadingDB extends RowDataPacket {
  id: number;
  date: string;
  unit_id: number;
  hours: number;
  user_id: number;
  changed_by: number;
  created_at: string;
  updated_at: string;
}

export type MeterReadingInsertData = {
  date: string;
  unit_id: number;
  hours: number;
  user_id: number;
  changed_by: number;
};

export const mapMeterReadingDBtoModel = (row: MeterReadingDB): MeterReading => ({
  id: row.id,
  date: row.date,
  unitId: row.unit_id,
  hours: row.hours,
  userId: row.user_id,
  changedBy: row.changed_by,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const mapModelToMeterReadingInsert = (
  data: Omit<MeterReading, 'id' | 'createdAt' | 'updatedAt' | 'changedBy'>,
  userId: number
): MeterReadingInsertData => ({
  date: data.date,
  unit_id: data.unitId,
  hours: data.hours,
  user_id: data.userId,
  changed_by: userId,
});

export type Filters = {
  unitId?: number;
  locationId?: number;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  offset?: number;
};

export type Pagination = {
  limit?: number;
  offset?: number;
};