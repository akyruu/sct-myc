import {PlayerRush} from '..';

export interface Player {
  /* Properties ------------------------------------------------------------ */
  id: string;
  name: string;
  teamId?: number;

  roomLeader?: boolean;
  teamLeader?: boolean;
  ready?: boolean;

  /* Rush ------------------------------------------------------------------ */
  rush?: PlayerRush;
  history?: PlayerRush[];
}
