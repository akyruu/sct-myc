import {Player} from './player';
import {Team} from './team';

export interface Room {
  /* Properties ------------------------------------------------------------ */
  id: string;
  leaderId: string;
  players: Player[];
  queue: string[];
  teams: Team[];

  started: boolean;
}
