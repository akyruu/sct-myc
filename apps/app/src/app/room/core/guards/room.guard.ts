import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { AppContext, RoomManager } from '../../../core';
import { JoinRoomData, JoinRoomDialog } from '../components';

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
  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
    const joinRoomId = route.queryParams.join;
    if (joinRoomId) {
      return this._joinRoom(joinRoomId);
    }

    const hasRoom = !!this._appContext.room;
    if (!hasRoom) {
      this._router.navigate(['/welcome']).then();
      return false;
    }
    return true;
  }

  private async _joinRoom(roomId): Promise<boolean> {
    if (!roomId) {
      this._router.navigate(['/welcome']).then();
      return false;
    }

    const playerName = this._appContext.playerName.value;
    if (!playerName) {
      const dialogRef = this._dialog.open(JoinRoomDialog, {
        data: <JoinRoomData>{ roomId: roomId }
      });

      const result = await dialogRef.afterClosed().toPromise();
      if (!result) {
        this._router.navigate(['/welcome']).then();
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
