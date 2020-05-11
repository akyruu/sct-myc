import {Injectable} from '@angular/core';
import {Room} from '@sct-myc/api-interfaces';
import {Socket} from 'socket.io';
import {RoomService} from './room.service';

@Injectable()
export class RoomManager {
  /* CONSTRUCTOR =========================================================== */
  constructor(private _roomService: RoomService) {}

  /* METHODS =============================================================== */
  createRoom(playerName: string): Room {
    const room = {
      id: undefined,
      leader: playerName,
      players: [playerName],
      queue: [playerName],
      teams: [],
      started: false
    };
    return this._roomService.create(room);
  }

  leaveRoom(client: Socket, playerName: string, roomId: string): void {
    const room = this._roomService.read(roomId);
    if (room) {
      room.players.splice(room.players.indexOf(playerName), 1);
      if (room.players.length === 0) {
        this._roomService.delete(roomId);
        return;
      }
      client.in(room.id).broadcast.emit('room:players', room.players);

      if (room.queue.includes(playerName)) {
        room.queue.splice(room.queue.indexOf(playerName), 1);
        client.in(room.id).broadcast.emit('room:queue', room.queue);
      } else {
        for (const team of room.teams) {
          if (team.players.includes(playerName)) {
            team.players.splice(team.players.indexOf(playerName), 1);
            client.in(room.id).broadcast.emit('room:team:updated', team);
            break;
          }
        }
      }
      this._roomService.update(room);
    }
  }

  /* Players --------------------------------------------------------------- */
  addPlayer(client: Socket, playerName: string, roomId: string): Room {
    let room = this._roomService.read(roomId);
    room.players.push(playerName);
    room.queue.push(playerName);

    room = this._roomService.update(room);
    client.in(room.id).broadcast.emit('room:players', room.players);
    client.in(room.id).broadcast.emit('room:queue', room.queue);
    return room;
  }

  /* Teams ----------------------------------------------------------------- */
  addTeam(client: Socket, roomId: string): void {
    let room = this._roomService.read(roomId);
    room.teams.push({
      id: room.teams.length + 1,
      leader: undefined,
      players: []
    });

    this._roomService.update(room);
    client.emit('room:teams', room.teams);
    client.in(roomId).broadcast.emit('room:teams', room.teams);
  }
}
