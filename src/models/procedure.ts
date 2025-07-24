import { UnitType } from "./unitType";

export interface Procedure {
    id: number;
    name: string;
    unitTypeId: string;
    type: ProcedureType;
    hoursInterval: number;
    periodInterval: number;
}

export interface ProcedureDTO {
    id: number;
    name: string;
    unitType: UnitType;
    type: ProcedureType;
    hoursInterval: number;
    periodINterval: number;
}

export enum ProcedureType {
    ByTime = 1,
    ByHours = 2,
}