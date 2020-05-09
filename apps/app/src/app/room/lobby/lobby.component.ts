import { Component, OnInit } from '@angular/core';
import { Room } from '@sct-myc/api-interfaces';

import { AppContext } from '../../core';

@Component({
  selector: 'sct-myc-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  /* FIELDS ================================================================ */
  room: Room;

  /* CONSTRUCTOR =========================================================== */
  constructor(private _appContext: AppContext) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this.room = this._appContext.room;
  }
}
