import { Player } from './player.interface';
import { Team } from './team.interface';

export interface Room {
  id: string;
  leaderId: string;
  players: Player[];
  queue: string[];
  teams: Team[];

  started?: boolean;
}
