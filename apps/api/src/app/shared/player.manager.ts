import {Injectable} from '@angular/core';
import {Socket} from 'socket.io';

import {SettingsService} from '../settings';
import {RoomEmitter} from './room.emitter';
import {RoomService} from './room.service';

@Injectable()
export class PlayerManager {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _roomEmitter: RoomEmitter,
    private _roomService: RoomService,
    private _settingsService: SettingsService
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

  /* Rush ------------------------------------------------------------------ */
  setReady(client: Socket, roomId: string, playerId: string, ready: boolean): void {
    const room = this._roomService.read(roomId);

    const player = room.players.find(player => player.id === playerId);
    player.rush.ready = ready;

    this._roomService.update(room);
    this._roomEmitter.emit(client, roomId, 'rush:player:updated', player.rush);
  }

  setRucksackType(client: Socket, roomId: string, playerId: string, rucksackId: number): void {
    const room = this._roomService.read(roomId);

    const player = room.players.find(p => p.id === playerId);
    player.rush.rucksackType = rucksackId
      ? this._settingsService.findRucksack(rucksackId)
      : undefined;

    this._roomService.update(room);
    this._roomEmitter.emit(client, roomId, 'rush:player:updated', player.rush);
  }
}
