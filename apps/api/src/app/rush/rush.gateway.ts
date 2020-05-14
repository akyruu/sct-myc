import {UseGuards} from '@nestjs/common';
import {WebSocketGateway} from '@nestjs/websockets';

import {SessionGuard, SessionService} from '../session';
import {RushManager} from './rush.manager';

@UseGuards(SessionGuard)
@WebSocketGateway()
export class RushGateway {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _sessionService: SessionService,
    private _rushManager: RushManager
  ) {}

  /* METHODS =============================================================== */
  // TODO
}
