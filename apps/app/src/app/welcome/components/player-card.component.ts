import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AppContext, RoomManager } from '../../core';
import { JoinRoomData, JoinRoomDialog } from './join-room-dialog';

@Component({
  selector: 'sct-myc-player-card',
  templateUrl: './player-card.component.html'
})
export class PlayerCardComponent implements OnInit {
  /* FIELDS ================================================================ */
  playerName: string;
  playerNameSaved = true;

  loading = false;

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _dialog: MatDialog,
    private _appContext: AppContext,
    private _roomManager: RoomManager
  ) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this.playerName = this._appContext.playerName.value;
    this.playerNameSaved = !!this.playerName;
  }

  /* Events ---------------------------------------------------------------- */
  async doCreateRoom(): Promise<void> {
    this._appContext.playerName.value = this.playerName;
    this.playerNameSaved = true;

    this._appContext.loading.next(this.loading = true);
    try {
      await this._roomManager.createRoom({ playerName: this.playerName });
    } catch (error) {
      // TODO check error
      console.log(error);
    }
    this._appContext.loading.next(this.loading = false);
  }

  async doJoinRoom(): Promise<void> {
    this._appContext.playerName.value = this.playerName;
    this.playerNameSaved = true;

    this._dialog.open(JoinRoomDialog, {
      data: <JoinRoomData>{
        playerName: this.playerName
      }
    });
  }

  doRemovePlayerName(): void {
    this._appContext.playerName.clear();

    delete this.playerName;
    this.playerNameSaved = false;
  }
}
