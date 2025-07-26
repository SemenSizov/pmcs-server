import { EquipmentUnit, EquipmentUnitDTO } from './equipmentUnit';

export interface Location {
    id: number;
    name: string;
}

export interface LocationDTO {
    id: number;
    name: string;
    units: EquipmentUnitDTO[];
}
