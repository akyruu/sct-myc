import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'sct-myc-leave-room-dialog',
  templateUrl: './leave-room.dialog.html'
})
export class LeaveRoomDialog {
  /* CONSTRUCTOR =========================================================== */
  constructor(public dialogRef: MatDialogRef<LeaveRoomDialog>) {}

  /* METHODS =============================================================== */
  doValidate() {
    this.dialogRef.close(true);
  }

  doClose() {
    this.dialogRef.close(false);
  }
}
