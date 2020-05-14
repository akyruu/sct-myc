import {Injectable} from '@angular/core';
import {Socket} from 'socket.io';

import {RoomEmitter, RoomService} from '../shared';

@Injectable()
export class TeamManager {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _roomEmitter: RoomEmitter,
    private _roomService: RoomService
  ) {}

  /* METHODS =============================================================== */
  setLeader(client: Socket, roomId: string, playerId: string, teamId?: number): void {
    let room = this._roomService.read(roomId);

    const team = room.teams.find(team => team.id === teamId);
    if (team.leaderId) {
      const player = room.players.find(p => p.id === team.leaderId);
      player.teamLeader = false;
      delete team.leaderId;
    }
    if (playerId) {
      const player = room.players.find(p => p.id === playerId);
      player.teamLeader = true;
      team.leaderId = playerId;
    }

    room = this._roomService.update(room);
    this._roomEmitter.emit(client, roomId, 'room:players', room.players);
    this._roomEmitter.emit(client, roomId, 'room:team:updated', team);
  }
}
