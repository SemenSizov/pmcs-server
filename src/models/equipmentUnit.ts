import { EquipmentType } from './equipmentType';
import {Location} from './location'

export interface EquipmentUnit {
  id: number;
  equipmentTypeId: number;
  locationId: number;
  serial: string;
}

export interface EquipmentUnitDTO {
  id: number;
  equipmentType: EquipmentType;
  location: Location;
  serial: string;
}
