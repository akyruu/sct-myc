import {Injectable} from '@angular/core';
import {CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {Socket} from 'socket.io';

import {SessionService} from './session.service';

@Injectable()
export class SessionGuard implements CanActivate {
  /* CONSTRUCTOR =========================================================== */
  constructor(private _sessionService: SessionService) {}

  /* METHODS =============================================================== */
  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();
    const hasSession = this._sessionService.has(client);
    if (!hasSession) {
      throw new UnauthorizedException();
    }
    return hasSession;
  }
}
