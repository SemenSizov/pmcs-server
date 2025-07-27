import { pool } from './pool.db';
import { logger } from '../utils/logger';
import { RowDataPacket } from 'mysql2';
import { MeterReading } from '../types/meterReading';

interface MeterReadingRDP extends RowDataPacket {
  id: number;
  date: string;
  unit_id: number;
  hours: number;
  user_id: number;
  changed_by: number;
  created_at: string;
  updated_at: string;
}

export const selectAllReadings = async (): Promise<MeterReadingRDP[]> => {
  try {
    const [rows] = await pool.execute<MeterReadingRDP[]>(
      'SELECT * FROM meters_readings ORDER BY date DESC'
    );
    return rows;
  } catch (e) {
    logger.logError(`Failed to select all meter readings. ${e}`);
    throw e;
  }
};

export const insertReading = async (reading: MeterReading, changedBy: number) => {
  const { date, unitId, hours, userId } = reading;
  try {
    await pool.execute(
      'INSERT INTO meters_readings (date, unit_id, hours, user_id, changed_by) VALUES (?, ?, ?, ?, ?)',
      [date, unitId, hours, userId, changedBy]
    );
  } catch (e) {
    logger.logError(`Failed to insert meter reading. ${e}`);
    throw e;
  }
};

export const updateReading = async (reading: MeterReading, changedBy: number) => {
  const { id, date, unitId, hours, userId } = reading;
  try {
    await pool.execute(
      'UPDATE meters_readings SET date = ?, unit_id = ?, hours = ?, user_id = ?, changed_by = ? WHERE id = ?',
      [date, unitId, hours, userId, changedBy, id]
    );
  } catch (e) {
    logger.logError(`Failed to update meter reading. ${e}`);
    throw e;
  }
};

export const deleteReading = async (id: number) => {
  try {
    await pool.execute('DELETE FROM meters_readings WHERE id = ?', [id]);
  } catch (e) {
    logger.logError(`Failed to delete meter reading. id = ${id}. ${e}`);
    throw e;
  }
};
