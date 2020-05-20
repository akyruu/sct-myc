import {Vehicle} from '../../settings/vehicle';
import {Fragment} from './fragment';

export interface VehicleCargo {
  vehicle: Vehicle;
  fragment: Fragment; // Current
  fragments: Fragment[]; // Stocked

  // Calculated
  storage: number;
  quantity: number;
  value: number;
}
