import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';

import {AppContext, RoomManager} from '../../../core';

@Injectable()
export class RoomGuard implements CanActivate {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _appContext: AppContext,
    private _roomManager: RoomManager
  ) {}

  /* METHODS =============================================================== */
  async canActivate(route: ActivatedRouteSnapshot): Promise<UrlTree | boolean> {
    const hasRoom = !!this._appContext.room;
    if (!hasRoom) {
      const hasRejoinRoom = await this._rejoinRoom();
      if (!hasRejoinRoom) {
        return this._router.parseUrl('/welcome');
      }
    }
    return true;
  }

  private async _rejoinRoom(): Promise<boolean> {
    // Check parameters
    const roomId = this._appContext.roomId.value;
    const playerId = this._appContext.playerId.value;
    if (!roomId || !playerId) {
      return false;
    }

    // Re-join room
    try {
      await this._roomManager.rejoinRoom(roomId, playerId, false);
    } catch (error) {
      this._appContext.roomId.clear();
      this._appContext.playerId.clear();
      return false;
    }
    return true;
  }
}
