export interface Player {
  id: string;
  name: string;
  teamId?: number;

  roomLeader?: boolean;
  teamLeader?: boolean;
}
