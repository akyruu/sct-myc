import {Vehicle} from '../reference/vehicle';
import {VehicleCargo} from './common/vehicle-cargo';
import {PlayerRush} from './player-rush';
import {RushState} from './rush-state';

export interface TeamRush {
  /* Properties ------------------------------------------------------------ */
  vehicle?: Vehicle;
  players: PlayerRush[];
  state: RushState;

  /* Rush ------------------------------------------------------------------ */
  cargo?: VehicleCargo;

  // Calculated
  rucksacksQuantity?: number;
  rucksacksValue?: number;
  boxesQuantity?: number;
  boxesValue?: number;
}
