import {Injectable} from '@angular/core';

import {RoomEmitter, RoomService} from '../shared';

@Injectable()
export class RushManager {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _roomEmitter: RoomEmitter,
    private _roomService: RoomService
  ) {}

  /* METHODS =============================================================== */
  // TODO
}
