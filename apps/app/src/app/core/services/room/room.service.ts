import { Injectable } from '@angular/core';
import { Room, RoomOptions } from '@sct-myc/api-interfaces';

import { SocketService } from '../socket.service';

@Injectable({ providedIn: 'root' })
export class RoomService {
  /* CONSTRUCTOR =========================================================== */
  constructor(private _socketService: SocketService) {}

  /* METHODS =============================================================== */
  /**
   * Create a new room.
   *
   * @param options Room options.
   */
  async createRoom(options: RoomOptions): Promise<Room> {
    return this._socketService.emitAndWait('room:create', options);
  }

  /**
   * Join an existing room.
   *
   * @param roomId Identifier of room to join.
   * @param options Room options.
   */
  async joinRoom(roomId: string, options: RoomOptions): Promise<Room> {
    return this._socketService.emitAndWait('room:join', { roomId: roomId, options: options });
  }

  /**
   * Leave current room.
   */
  async leaveRoom(): Promise<void> {
    return this._socketService.emitAndWait('room:leave');
  }
}
