import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';

import {AppContext, RoomManager} from '../../../core';
import {JoinRoomData, JoinRoomDialog} from '../components';

@Injectable()
export class JoinRoomGuard implements CanActivate {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _appContext: AppContext,
    private _roomManager: RoomManager
  ) {}

  /* METHODS =============================================================== */
  async canActivate(route: ActivatedRouteSnapshot): Promise<UrlTree | boolean> {
    const roomId = route.data.roomId;
    if (!roomId) {
      return this._router.parseUrl('/welcome');
    }

    const playerName = this._appContext.playerName.value;
    if (!playerName) {
      const dialogRef = this._dialog.open(JoinRoomDialog, {
        data: <JoinRoomData>{roomId: roomId}
      });

      const result = await dialogRef.afterClosed().toPromise();
      if (!result) {
        return this._router.parseUrl('/welcome');
      }
      return result;
    }

    try {
      await this._roomManager.joinRoom(roomId, playerName);
    } catch (error) {
      // TODO manage error
      // if player already exist: dialog
      // else notification and return to welcome
    }

    return false;
  }
}
