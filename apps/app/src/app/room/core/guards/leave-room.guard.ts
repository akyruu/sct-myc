import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';

import { RoomManager } from '../../../core';

@Injectable()
export class LeaveRoomGuard implements CanDeactivate<any> {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _dialog: MatDialog,
    private _roomManager: RoomManager
  ) {}

  /* METHODS =============================================================== */
  async canDeactivate(): Promise<boolean> {
    const dialogRef = this._dialog.open(LeaveRoomGuard, {
      role: 'alertdialog'
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      await this._roomManager.leaveRoom();
    }
    return result;
  }
}
