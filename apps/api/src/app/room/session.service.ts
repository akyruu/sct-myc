import {Injectable} from '@angular/core';
import {Player, Room} from '@sct-myc/api-interfaces';
import {Socket} from 'socket.io';

export interface Session {
  playerId: string;
  roomId: string;
}

@Injectable()
export class SessionService {
  /* FIELDS ================================================================ */
  private readonly _sessions = new Map<string, Session>();

  /* METHODS =============================================================== */
  create(client: Socket, player: Player, room: Room): void {
    this._sessions.set(client.id, {playerId: player.id, roomId: room.id});
  }

  get(client: Socket): Session {
    return this._sessions.get(client.id);
  }

  has(client: Socket) {
    return this._sessions.has(client.id);
  }

  delete(client: Socket): void {
    this._sessions.delete(client.id);
  }
}
