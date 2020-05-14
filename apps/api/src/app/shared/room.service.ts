import {Injectable} from '@angular/core';
import {Room} from '@sct-myc/api-interfaces';
import * as uuid from 'uuid';

@Injectable()
export class RoomService {
  /* FIELDS ================================================================ */
  private readonly _rooms = new Map<string, Room>();

  /* CONSTRUCTOR =========================================================== */
  constructor() {}

  /* METHODS =============================================================== */
  create(room: Room): Room {
    if (room.id) {
      if (this._rooms.has(room.id)) {
        throw new Error('The room with id <' + room.id + '> already exists!');
      }
    } else {
      const ids = Array.from(this._rooms.keys());
      while (ids.includes(room.id = uuid.v4())) {}
    }
    this._rooms.set(room.id, room);
    return Object.assign({}, room);
  }

  read(roomId: string): Room {
    const room = this._rooms.get(roomId);
    return room ? Object.assign({}, room) : undefined;
  }

  readAll(): Room[] {
    return Array.from(this._rooms.values());
  }

  update(room: Room): Room {
    let model = this._rooms.get(room.id);
    if (!model) {
      throw new Error('Room not found for id <' + room.id + '>');
    }

    model = Object.assign(model, room);
    return Object.assign({}, model);
  }

  delete(roomId: string): void {
    this._rooms.delete(roomId);
  }
}
