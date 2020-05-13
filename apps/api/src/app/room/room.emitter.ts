import {Injectable} from '@angular/core';
import {Socket} from 'socket.io';

@Injectable()
export class RoomEmitter {
  /* METHODS =============================================================== */
  broadcast(client: Socket, roomId: string, eventName: string, data?: any): void {
    client.in(roomId).broadcast.emit(eventName, data);
  }

  emit(client: Socket, roomId: string, eventName: string, data?: any): void {
    client.emit(eventName, data);
    this.broadcast(client, roomId, eventName, data);
  }
}
