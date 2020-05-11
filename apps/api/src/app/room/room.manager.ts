import { Injectable } from '@angular/core';
import { Player, Room } from '@sct-myc/api-interfaces';
import { Socket } from 'socket.io';

import { RoomService } from './room.service';

@Injectable()
export class RoomManager {
  /* CONSTRUCTOR =========================================================== */
  constructor(private _roomService: RoomService) {}

  /* METHODS =============================================================== */
  createRoom(client: Socket, player: Player): Room {
    let room: Room = {
      id: undefined,
      leaderId: player.id,
      players: [player],
      queue: [player.id],
      teams: []
    };
    player.roomLeader = true;

    room = this._roomService.create(room);
    client.join(room.id);
    return room;
  }

  joinRoom(client: Socket, player: Player, roomId: string): Room {
    let room = this._roomService.read(roomId);
    room.players.push(player);
    room.queue.push(player.id);

    room = this._roomService.update(room);
    client.join(room.id);
    this._roomBroadcast(client, room.id, 'room:players', room.players);
    this._roomBroadcast(client, room.id, 'room:queue', room.queue);
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
      this._roomBroadcast(client, room.id, 'room:players', room.players);

      if (room.queue.includes(playerId)) {
        room.queue.splice(room.queue.indexOf(playerId), 1);
        this._roomBroadcast(client, room.id, 'room:queue', room.queue);
      } else {
        for (const team of room.teams) {
          if (team.playerIds.includes(playerId)) {
            team.playerIds.splice(team.playerIds.indexOf(playerId), 1);
            this._roomBroadcast(client, room.id, 'room:team:updated', team);
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
    room.teams.push({
      id: room.teams.length + 1,
      playerIds: []
    });

    room = this._roomService.update(room);
    this._roomEmit(client, roomId, 'room:teams', room.teams);
  }

  removeTeam(client: Socket, roomId: string, teamId: number) {
    let room = this._roomService.read(roomId);

    const teamIndex = room.teams.findIndex(t => t.id === teamId);
    const team = room.teams[teamIndex];
    const teamPlayers = room.players.filter(player => team.playerIds.includes(player.id));
    teamPlayers.forEach(player => {
      player.teamId = null;
      player.teamLeader = false;
      room.queue.push(player.id);
    });
    room.teams.splice(teamIndex, 1);

    room = this._roomService.update(room);
    this._roomEmit(client, roomId, 'room:teams', room.teams);
    if (teamPlayers.length > 0) {
      this._roomEmit(client, roomId, 'room:players', room.players);
      this._roomEmit(client, roomId, 'room:queue', room.queue);
    }
  }

  /* Tools ----------------------------------------------------------------- */
  private _roomBroadcast(client: Socket, roomId: string, eventName: string, data?: any): void {
    client.in(roomId).broadcast.emit(eventName, data);
  }

  private _roomEmit(client: Socket, roomId: string, eventName: string, data?: any): void {
    client.emit(eventName, data);
    this._roomBroadcast(client, roomId, eventName, data);
  }
}
