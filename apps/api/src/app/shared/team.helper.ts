import {Injectable} from '@angular/core';
import {Fragment, Room, Team, TeamRush, VehicleCargo} from '@sct-myc/api-interfaces';

@Injectable()
export class TeamHelper {
  /* METHODS =============================================================== */
  createTeam(room: Room): Team {
    return {
      id: room.teams.length + 1,
      playerIds: [],
    };
  }

  /* Rush ------------------------------------------------------------------ */
  createRush(team: Team): TeamRush {
    return {
      teamId: team.id,
      playerIds: team.playerIds,
      state: 'prepare'
    };
  }

  createCargo(team: Team): VehicleCargo {
    return {
      vehicle: team.rush.vehicle,
      fragment: this.createFragment(),
      fragments: [],
      quantity: 0,
      storage: 0,
      value: 0
    };
  }

  createFragment(): Fragment {
    return {
      ores: [],
      quantity: 0,
      value: 0
    };
  }
}
