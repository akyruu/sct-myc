import { Team } from './team.interface';

export interface Room {
  id: string;
  leader?: string;
  players?: string[];
  teams?: Team[];

  started?: boolean;
  queue?: string[];
}
