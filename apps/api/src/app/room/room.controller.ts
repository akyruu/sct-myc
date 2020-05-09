import { Controller, Get } from '@nestjs/common';
import { Room } from '@sct-myc/api-interfaces';

import { RoomService } from './room.service';

@Controller('/room')
export class RoomController {
  /* CONSTRUCTOR =========================================================== */
  constructor(private _roomService: RoomService) {}

  /* METHODS =============================================================== */
  @Get('/list')
  getRooms(): Room[] {
    return this._roomService.findAll();
  }
}
