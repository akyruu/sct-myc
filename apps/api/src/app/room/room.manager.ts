import {Injectable} from '@angular/core';
import {Player, Room} from '@sct-myc/api-interfaces';
import {Socket} from 'socket.io';

import {PlayerHelper, RoomEmitter, RoomHelper, RoomService, TeamHelper} from '../shared';

@Injectable()
export class RoomManager {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _playerHelper: PlayerHelper,
    private _roomEmitter: RoomEmitter,
    private _roomHelper: RoomHelper,
    private _roomService: RoomService,
    private _teamHelper: TeamHelper
  ) {}

  /* METHODS =============================================================== */
  createRoom(client: Socket, player: Player): Room {
    let room = this._roomHelper.createRoom(player);
    player.roomLeader = true;

    room = this._roomService.create(room);
    client.join(room.id);
    return room;
  }

  joinRoom(client: Socket, player: Player, roomId: string): Room {
    let room = this._roomService.read(roomId);
    this._roomHelper.addPlayer(room, player);

    room = this._roomService.update(room);
    client.join(room.id);
    this._roomEmitter.broadcast(client, room.id, 'room:players', room.players);
    this._roomEmitter.broadcast(client, room.id, 'room:queue', room.queue);
    return room;
  }

  rejoinRoom(client: Socket, roomId: string): Room {
    let room = this._roomService.read(roomId);
    client.join(room.id);
    return room;
  }

  leaveRoom(client: Socket, playerId: string, roomId: string): void {
    const room = this._roomService.read(roomId);
    if (room) {
      room.players.splice(room.players.findIndex(player => player.id === playerId), 1);
      if (room.players.length === 0) {
        this._roomService.delete(roomId);
        return;
      }
      this._roomEmitter.broadcast(client, room.id, 'room:players', room.players);

      if (room.queue.includes(playerId)) {
        room.queue.splice(room.queue.indexOf(playerId), 1);
        this._roomEmitter.broadcast(client, room.id, 'room:queue', room.queue);
      } else {
        for (const team of room.teams) {
          if (team.playerIds.includes(playerId)) {
            team.playerIds.splice(team.playerIds.indexOf(playerId), 1);
            this._roomEmitter.broadcast(client, room.id, 'room:team:updated', team);
            break;
          }
        }
      }
      this._roomService.update(room);
    }
  }

  /* Teams ----------------------------------------------------------------- */
  addTeam(client: Socket, roomId: string): void {
    let room = this._roomService.read(roomId);
    room.teams.push(this._teamHelper.createTeam(room));

    room = this._roomService.update(room);
    this._roomEmitter.emit(client, roomId, 'room:teams', room.teams);
  }

  removeTeam(client: Socket, roomId: string, teamId: number) {
    let room = this._roomService.read(roomId);

    let teamIndex = room.teams.findIndex(t => t.id === teamId);
    const team = room.teams[teamIndex];
    const teamPlayers = room.players.filter(player => player.teamId === team.id);
    teamPlayers.forEach(player => {
      player.teamId = null;
      player.teamLeader = false;
      room.queue.push(player.id);
    });
    room.teams.splice(teamIndex, 1);
    room.teams.slice(teamIndex).forEach(team => {
      team.id--;
      room.players.filter(player => team.playerIds.includes(player.id))
        .forEach(player => player.teamId = team.id);
    });

    room = this._roomService.update(room);
    this._roomEmitter.emit(client, roomId, 'room:updated', room);
  }

  /* Rush ------------------------------------------------------------------ */
  startRush(client: Socket, roomId: string): void {
    let room = this._roomService.read(roomId);
    room.started = true;

    room.players.forEach(player => player.rush = this._playerHelper.createRush(player));
    room.teams.forEach(team => team.rush = this._teamHelper.createRush(team));

    room = this._roomService.update(room);
    this._roomEmitter.emit(client, roomId, 'room:rush:started', room);
  }
}
