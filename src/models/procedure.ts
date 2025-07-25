import { UnitType } from "./unitType";

export interface Procedure{
    id: number;
    name: string;
    type: 'period' | 'hours',
    hours?: number
    period?: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual';
    unit_type_id: number;
}

export interface ProcedureDTO {
    id: number;
    name: string;
    type: 'period' | 'hours',
    hours?: number
    period?: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual';
    unitType: UnitType;
}
