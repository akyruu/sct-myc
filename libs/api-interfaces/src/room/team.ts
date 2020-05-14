import {TeamRush} from '../rush/team-rush';

export interface Team {
  id: number;
  leaderId?: string;
  playerIds: string[];

  rush?: TeamRush;
  rushs?: TeamRush[];
}
