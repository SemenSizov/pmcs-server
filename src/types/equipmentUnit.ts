import { EquipmentType } from './equipmentType';
import {Location} from './location'

export interface EquipmentUnit {
  id: number;
  equipmentTypeId: number;
  locationId: number;
  serial: string;
  hasHourmeter: boolean;
}

export interface EquipmentUnitDTO {
  id: number;
  equipmentType: EquipmentType;
  location: Location;
  serial: string;
  hasHourmeter: boolean;
}
