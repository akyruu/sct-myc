import {Rucksack} from '..';
import {Box} from './common/box';
import {PlayerRucksack} from './player-rucksack';

export interface PlayerRush {
  // Identifiers
  readonly playerId: string;
  readonly teamId: number;

  // Preparation
  rucksackType?: Rucksack;
  ready: boolean;

  // Running
  rucksack?: PlayerRucksack;
  boxes?: Box[];

  // Calculated
  value?: number;
}
