import { UnitType } from './unitType';
import {Location} from './location'

export interface Unit {
  id: number;
  unitTypeId: number;
  locationId: number;
  serial: string;
}

export interface UnitDTO {
  id: number;
  unitType: UnitType;
  location: Location;
  serial: string;
}
