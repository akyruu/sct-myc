import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AppContext, RoomManager } from '../../../core';

export class JoinRoomData {
  roomId: string;
}

@Component({
  selector: 'sct-myc-join-room-dialog',
  templateUrl: './join-room.dialog.html'
})
export class JoinRoomDialog {
  /* FIELDS ================================================================ */
  playerName: string;

  /* CONSTRUCTOR =========================================================== */
  constructor(
    public dialogRef: MatDialogRef<JoinRoomDialog>,
    @Inject(MAT_DIALOG_DATA) private _data: JoinRoomData,
    private _appContext: AppContext,
    private _roomManager: RoomManager
  ) {}

  /* METHODS =============================================================== */
  doValidate(): void {
    this._appContext.playerName.value = this.playerName;
    this._roomManager.joinRoom(this._data.roomId, this.playerName)
      .then(() => this.dialogRef.close(true))
      .catch(error => {
        // TODO show error
      });
  }

  doClose(): void {
    this.dialogRef.close(false);
  }
}
