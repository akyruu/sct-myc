import {RushState, Vehicle, VehicleCargo} from '..';

export interface TeamRush {
  // Identifiers
  readonly teamId: number;
  readonly playerIds: string[];

  // Rush
  state: RushState;

  // Preparation
  vehicle?: Vehicle;

  // Running
  cargo?: VehicleCargo;

  // Calculated
  rucksacksQuantity?: number;
  rucksacksValue?: number;
  boxesQuantity?: number;
  boxesValue?: number;
}
