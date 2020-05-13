import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, Input} from '@angular/core';
import {Player, Team} from '@sct-myc/api-interfaces';

import {RoomService} from '../../../core';
import {DragDropData} from '../models';

@Component({
  selector: 'sct-myc-lobby-players',
  templateUrl: './lobby-players.component.html',
})
export class LobbyPlayersComponent {
  /* FIELDS ================================================================ */
  @Input() data: DragDropData;
  @Input() myPlayer: Player;

  /* CONSTRUCTOR =========================================================== */
  constructor(private _roomService: RoomService) {}

  /* METHODS =============================================================== */
  doMovePlayer(event: CdkDragDrop<DragDropData>): void {
    if (event.previousContainer !== event.container) {
      const currentData = event.container.data;
      transferArrayItem(event.previousContainer.data.players, currentData.players, event.previousIndex, event.currentIndex);

      const player: Player = event.item.data;
      this._roomService.playerSetTeam(player.id, currentData.team?.id).then();
    }
  }

  doTeamSetLeader(player: Player, team: Team): void {
    this._roomService.teamSetLeader(player?.id, team.id).then();
  }
}
