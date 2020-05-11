import {Component, OnInit} from '@angular/core';
import {Room} from '@sct-myc/api-interfaces';

import {AppContext, RoomService} from '../../core';

@Component({
  selector: 'sct-myc-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  /* FIELDS ================================================================ */
  room: Room;

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _appContext: AppContext,
    private _roomService: RoomService
  ) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this.room = this._appContext.room;
  }

  /* Events ---------------------------------------------------------------- */
  doAddTeam(): void {
    this._roomService.addTeam().then();
  }
}
