import { Injectable } from '@angular/core';
import { Room } from '@sct-myc/api-interfaces';
import * as uuid from 'uuid';

@Injectable()
export class RoomService {
  /* FIELDS ================================================================ */
  private readonly _rooms = new Map<string, Room>();

  /* CONSTRUCTOR =========================================================== */
  constructor() {}

  /* METHODS =============================================================== */
  create(leader: string): Room {
    let id: string;
    const ids = Array.from(this._rooms.keys());
    while (ids.includes(id = uuid.v4())) {}

    const room: Room = {
      id: id,
      leader: leader,
      players: [leader],
      queue: [leader],
      started: false
    };
    this._rooms.set(id, room);
    return room;
  }

  findById(roomId: string): Room {
    return this._rooms.get(roomId);
  }

  findAll(): Room[] {
    return Array.from(this._rooms.values());
  }

  deleteRoom(roomId: string): void {
    this._rooms.delete(roomId);
  }

  /* Players --------------------------------------------------------------- */
  addPlayer(player: string, roomId: string): void {
    const room = this.findById(roomId);
    room.players.push(player);
    room.queue.push(player);
  }

  findAllPlayers(roomId: string): string[] {
    const room = this.findById(roomId);
    return room.players;
  }

  deletePlayer(playerName: string, roomId: string): void {
    const room = this.findById(roomId);
    room.players.splice(room.players.indexOf(playerName), 1);
  }
}
