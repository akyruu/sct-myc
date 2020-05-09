import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RoomManager } from '../../core';

export class JoinRoomData {
  playerName: string;
}

@Component({
  selector: 'sct-myc-join-room-dialog',
  templateUrl: './join-room-dialog.html'
})
export class JoinRoomDialog {
  /* FIELDS ================================================================ */
  roomId: string;

  /* CONSTRUCTOR =========================================================== */
  constructor(
    public dialogRef: MatDialogRef<JoinRoomDialog>,
    @Inject(MAT_DIALOG_DATA) private _data: JoinRoomData,
    private _roomManager: RoomManager
  ) {}

  /* METHODS =============================================================== */
  async doValidate(): Promise<void> {
    try {
      await this._roomManager.joinRoom(this.roomId, this._data.playerName);
      this.dialogRef.close();
    } catch (error) {
      // TODO check error
    }
  }

  doClose(): void {
    this.dialogRef.close();
  }
}
