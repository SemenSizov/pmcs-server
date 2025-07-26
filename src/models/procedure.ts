import { EquipmentType } from "./equipmentType";

export interface Procedure{
    id: number;
    name: string;
    type: 'period' | 'hours',
    hours?: number
    period?: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual';
    equipment_type_id: number;
}

export interface ProcedureDTO {
    id: number;
    name: string;
    type: 'period' | 'hours',
    hours?: number
    period?: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual';
    equipmentType: EquipmentType;
}
