import {Clipboard} from '@angular/cdk/clipboard';
import {Component, Input} from '@angular/core';
import {Player, Room} from '@sct-myc/api-interfaces';

import {RoomService} from '../../../core';

@Component({
  selector: 'sct-myc-lobby-menubar',
  templateUrl: './lobby-menubar.component.html'
})
export class LobbyMenubarComponent {
  /* FIELDS ================================================================ */
  @Input() room: Room;
  @Input() myPlayer: Player;
  @Input() rushStartDisabled: boolean;

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _clipboard: Clipboard,
    private _roomService: RoomService
  ) {}

  /* METHODS =============================================================== */
  doCopyRoomId(): void {
    this._clipboard.copy(this.room.id);
  }

  doCopyRoomUrl() {
    this._clipboard.copy(window.location.protocol + '//' + window.location.host + '/room/join/' + this.room.id);
  }

  doRushStart() {
    this._roomService.startRush().then();
  }
}
