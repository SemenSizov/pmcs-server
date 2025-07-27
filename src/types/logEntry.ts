import { Procedure } from "./procedure";
import { EquipmentUnitDTO } from "./equipmentUnit";

export interface LogEntry {
    id: number;
    date: Date;
    hours: number | null;
    procedureId: number;
    unitId: number;
}

export interface LodEntryDTO {
    id: number;
    date: Date;
    hours: number | null;
    procedure: Procedure;
    unit: EquipmentUnitDTO
}