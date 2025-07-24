import { UnitType } from './unitType';

export interface Unit {
  id: number;
  unitTypeId: number;
  locationId: number;
  serialNumber: string;
}

export interface UnitDTO {
  id: number;
  unitType: UnitType;
  location: Location;
  serialNumber: string;
}
