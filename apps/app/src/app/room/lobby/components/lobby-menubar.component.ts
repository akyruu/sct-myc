import {Clipboard} from '@angular/cdk/clipboard';
import {Component, OnInit} from '@angular/core';
import {Room} from '@sct-myc/api-interfaces';

import {AppContext} from '../../../core';

@Component({
  selector: 'sct-myc-lobby-menubar',
  templateUrl: './lobby-menubar.component.html'
})
export class LobbyMenubarComponent implements OnInit {
  /* FIELDS ================================================================ */
  private _room: Room;

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _clipboard: Clipboard,
    private _appContext: AppContext
  ) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this._room = this._appContext.room;
  }

  /* Events ---------------------------------------------------------------- */
  doCopyRoomId(): void {
    this._clipboard.copy(this._room.id);
  }

  doCopyRoomUrl() {
    this._clipboard.copy(window.location.protocol + '//' + window.location.host + '/room?join=' + this._room.id);
  }
}
