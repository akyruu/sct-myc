import {Injectable} from '@angular/core';
import {Room, Team, TeamRush} from '@sct-myc/api-interfaces';

@Injectable()
export class RushHelper {
  /* CONSTRUCTOR =========================================================== */
  constructor() {}

  /* METHODS =============================================================== */
  createTeamRush(team: Team, room: Room): TeamRush {
    return {
      players: room.players
        .filter(player => player.teamId = team.id)
        .map(player => ({playerId: player.id, state: 'prepare'})),
      state: 'prepare'
    };
  }
}
