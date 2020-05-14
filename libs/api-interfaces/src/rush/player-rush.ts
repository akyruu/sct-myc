import {Rucksack} from '../reference/rucksack';
import {Box} from './common/box';
import {PlayerRucksack} from './player-rucksack';
import {RushState} from './rush-state';

export interface PlayerRush {
  /* Properties ------------------------------------------------------------ */
  rucksackType?: Rucksack;
  state: RushState; // Synchronized with team state

  /* Rush ------------------------------------------------------------------ */
  rucksack?: PlayerRucksack;
  boxes?: Box[];

  // Calculated
  value?: number;
}
