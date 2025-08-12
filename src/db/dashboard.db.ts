import { DashboardEntry } from '../types/dashboard';
import { queryOrThrow } from '../utils/db';

export const selectDashboardData = async () => {
    const query = `SELECT
        loc.id				AS location_id,
        loc.name              AS location_name,
        eu.serial             AS unit_serial,
        et.name               AS equipment_type,
        p.name                AS procedure_name,
        p.type              AS procedure_type,
        p.hours               AS procedure_hours,
        p.period              AS procedure_period,
        le.date               AS last_log_date,
        le.hours              AS last_log_hours,
        mr.hours              AS last_meter_hours
        FROM log_entries le
        JOIN (
          -- останній log_entries на пару (unit_id, procedure_id)
          SELECT
            l.unit_id,
            l.procedure_id,
            MAX(CONCAT(l.date, ' ', LPAD(l.id, 10, '0'))) AS max_key
          FROM log_entries l
          GROUP BY l.unit_id, l.procedure_id
        ) k
          ON k.unit_id = le.unit_id
         AND k.procedure_id = le.procedure_id
         AND CONCAT(le.date, ' ', LPAD(le.id, 10, '0')) = k.max_key
        JOIN equipment_units  eu  ON eu.id  = le.unit_id
        JOIN procedures       p   ON p.id   = le.procedure_id
        JOIN equipment_types  et  ON et.id  = eu.equipment_type_id
        JOIN locations        loc ON loc.id = eu.location_id
        -- останні meters_readings по кожному юніту
        LEFT JOIN (
          SELECT m2.*
          FROM meters_readings m2
          JOIN (
            SELECT unit_id,
                   MAX(CONCAT(date, ' ', LPAD(id, 10, '0'))) AS max_key
            FROM meters_readings
            GROUP BY unit_id
          ) k2
            ON k2.unit_id = m2.unit_id
           AND CONCAT(m2.date, ' ', LPAD(m2.id, 10, '0')) = k2.max_key
        ) mr ON mr.unit_id = eu.id

        ORDER BY loc.name, eu.serial, p.name;
        `;
    return queryOrThrow<DashboardEntry[]>(query);
};