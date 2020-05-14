import {Injectable} from '@angular/core';
import {Socket} from 'socket.io';

import {RoomEmitter, RoomService} from '../shared';

@Injectable()
export class PlayerManager {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _roomEmitter: RoomEmitter,
    private _roomService: RoomService
  ) {}

  /* METHODS =============================================================== */
  setTeam(client: Socket, roomId: string, playerId: string, teamId?: number): void {
    let room = this._roomService.read(roomId);

    const player = room.players.find(player => player.id === playerId);
    if (player.teamId) {
      const team = room.teams.find(team => team.id === player.teamId);
      if (team.leaderId === playerId) {
        delete team.leaderId;
      }
      team.playerIds.splice(team.playerIds.indexOf(playerId), 1);
      delete player.teamId;
    } else {
      room.queue.splice(room.queue.indexOf(playerId), 1);
    }

    if (teamId) {
      const team = room.teams.find(team => team.id === teamId);
      team.playerIds.push(playerId);
      player.teamId = team.id;
    } else {
      room.queue.push(playerId);
    }

    room = this._roomService.update(room);
    this._roomEmitter.emit(client, roomId, 'room:updated', room);
  }
}
