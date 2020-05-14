import {Vehicle} from '../../reference/vehicle';
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
