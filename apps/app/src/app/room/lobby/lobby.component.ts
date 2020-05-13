import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, OnInit} from '@angular/core';
import {Player, Room, Team} from '@sct-myc/api-interfaces';
import {Subscription} from 'rxjs';

import {AppContext, RoomService} from '../../core';

interface DragDropData {
  team?: Team;
  players: Player[];
}

@Component({
  selector: 'sct-myc-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  /* FIELDS ================================================================ */
  myPlayer: Player;

  queue: DragDropData;
  teams: DragDropData[] = [];

  private _room: Room;
  private _subscription: Subscription;

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _appContext: AppContext,
    private _roomService: RoomService
  ) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this.myPlayer = this._appContext.myPlayer;

    this._room = this._appContext.room;
    this._refresh();

    this._subscription = this._appContext.roomChanges.subscribe(this._refresh.bind(this));
  }

  /* Events ---------------------------------------------------------------- */
  doAddTeam(): void {
    this._roomService.addTeam().then();
  }

  doRemoveTeam(team: Team) {
    this._roomService.removeTeam(team.id).then();
  }

  doMovePlayer(event: CdkDragDrop<DragDropData>): void {
    if (event.previousContainer !== event.container) {
      const currentData = event.container.data;
      transferArrayItem(event.previousContainer.data.players, currentData.players, event.previousIndex, event.currentIndex);

      const player: Player = event.item.data;
      this._roomService.setPlayerTeam(player.id, currentData.team?.id).then();
    }
  }

  /* Tools ----------------------------------------------------------------- */
  private _refresh(): void {
    this.queue = {players: this._room.players.filter(player => this._room.queue.includes(player.id))};
    this.teams = this._room.teams.map(team => ({
      team: team,
      players: this._room.players.filter(player => player.teamId === team.id)
    }));
  }
}
