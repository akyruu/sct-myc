import {Injectable} from '@angular/core';
import {Socket} from 'socket.io';

import {SettingsService} from '../settings';
import {PlayerHelper} from './player.helper';
import {RoomEmitter} from './room.emitter';
import {RoomService} from './room.service';
import {TeamHelper} from './team.helper';

@Injectable()
export class TeamManager {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _roomEmitter: RoomEmitter,
    private _roomService: RoomService,
    private _settingsService: SettingsService,
    private _teamHelper: TeamHelper,
    private _playerHelper: PlayerHelper
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

  /* Rush ------------------------------------------------------------------ */
  launch(client: Socket, roomId: string, teamId: number) {
    const room = this._roomService.read(roomId);

    const team = room.teams.find(t => t.id === teamId);
    team.rush.cargo = this._teamHelper.createCargo(team);
    team.rush.state = 'running';

    const players = room.players.filter(player => player.teamId === teamId);
    players.forEach(player => {
      player.rush.rucksack = this._playerHelper.createRucksack(player);
      player.rush.boxes = [];
      player.rush.value = 0;
    });

    this._roomService.update(room);
    this._roomEmitter.emit(client, roomId, 'rush:team:launched', {
      rush: team.rush,
      playersRush: players.map(player => player.rush)
    });
  }

  setVehicle(client: Socket, roomId: string, teamId: number, vehicleId: number) {
    const room = this._roomService.read(roomId);

    const team = room.teams.find(t => t.id === teamId);
    team.rush.vehicle = vehicleId
      ? this._settingsService.findVehicle(vehicleId)
      : undefined;

    this._roomService.update(room);
    this._roomEmitter.emit(client, roomId, 'rush:team:updated', team.rush);
  }
}
