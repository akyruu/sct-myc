import {TeamRush} from '..';

export interface Team {
  /* Properties ------------------------------------------------------------ */
  id: number;
  leaderId?: string;
  playerIds: string[];

  /* Rush ------------------------------------------------------------------ */
  rush?: TeamRush;
  history?: TeamRush[];
}
