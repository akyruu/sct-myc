import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';

import {AppContext, RoomManager} from '../../../core';
import {LeaveRoomDialog} from '../components';

@Injectable()
export class LeaveRoomGuard implements CanDeactivate<any> {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _dialog: MatDialog,
    private _appContext: AppContext,
    private _roomManager: RoomManager
  ) {}

  /* METHODS =============================================================== */
  async canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Promise<boolean> {
    if (this._isError(nextState)) {
      return true;
    }

    const result = await this._openConfirmDialog();
    if (result) {
      await this._roomManager.leaveRoom();
    }
    return result;
  }

  private _isError(nextState: RouterStateSnapshot): boolean {
    return nextState && nextState.url.startsWith('/room/rush');
  }

  private _openConfirmDialog(): Promise<boolean> {
    const dialogRef = this._dialog.open(LeaveRoomDialog, {
      role: 'alertdialog'
    });
    return dialogRef.afterClosed().toPromise();
  }
}
