import {Injectable} from '@angular/core';
import {Player, Room} from '@sct-myc/api-interfaces';

import {PlayerHelper} from './player.helper';
import {TeamHelper} from './team.helper';

@Injectable()
export class RoomHelper {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _playerHelper: PlayerHelper,
    private _teamHelper: TeamHelper
  ) {}

  /* METHODS =============================================================== */
  createRoom(leader: Player): Room {
    return {
      id: undefined,
      leaderId: leader.id,
      players: [leader],
      queue: [leader.id],
      teams: [],
      started: false
    };
  }

  addPlayer(room: Room, player: Player) {
    room.players.push(player);
    room.queue.push(player.id);
  }
}
