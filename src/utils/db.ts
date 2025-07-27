import { pool } from '../db/pool.db';
import { logger } from './logger';
import type { RowDataPacket, ResultSetHeader, OkPacket, FieldPacket } from 'mysql2';

export async function queryOrThrow<TResult extends RowDataPacket[] | ResultSetHeader | OkPacket>(
  query: string,
  params: any[] = []
): Promise<TResult> {
  try {
    const [result] = await pool.execute<TResult>(query, params);
    return result;
  } catch (e) {
    logger.logError(`Query failed: ${query}. Params: ${JSON.stringify(params)}. Error: ${e}`);
    throw e;
  }
}
