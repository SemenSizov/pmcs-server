import { Unit, UnitDTO } from "./unit";

export interface Location {
    id: number;
    name: string;
}

export interface LocationDTO {
    id: number;
    name: string;
    units: UnitDTO[]
}