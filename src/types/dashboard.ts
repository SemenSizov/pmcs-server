import { RowDataPacket } from "mysql2";

export interface DashboardEntry extends RowDataPacket {
    location_id: number;
    location_name: string;
    unit_serial: string;
    equipment_type: string;
    procedure_name: string;
    procedure_type: 'period' | 'hours';
    procedure_hours: number;
    procedure_period: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual';
    last_log_date: string;
    last_log_hours: number;
    last_meter_hours: number;
};

export interface DashboardEntryWithStatus extends DashboardEntry {
    status?: "ok" | "warning" | "error";
};

export type UnitGroup = {
  serial: string;
  equipment_type: string;
  entries: DashboardEntryWithStatus[];
};

export type LocationGroup = {
  id: number;        // = location_id
  name: string;      // = location_name
  units: UnitGroup[];
};