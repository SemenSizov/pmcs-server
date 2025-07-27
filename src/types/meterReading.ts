export interface MeterReading {
  id: number;
  date: string; // ISO format
  unitId: number;
  hours: number;
  userId: number;
}