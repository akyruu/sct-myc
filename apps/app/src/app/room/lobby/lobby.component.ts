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

  /* Tools ----------------------------------------------------------------- */
  private _refresh(): void {
    this.myPlayer = this._appContext.myPlayer;
    this.queue = {
      players: this._room.players
        .filter(player => this._room.queue.includes(player.id))
        .sort((p1, p2) => p1.name.localeCompare(p2.name))
    };
    this.teams = this._room.teams.map(team => ({
      team: team,
      players: this._room.players
        .filter(player => player.teamId === team.id)
        .sort((p1, p2) => {
          if (p1.teamLeader) {
            return -1;
          } else if (p1.teamLeader) {
            return 1;
          }
          return p1.name.localeCompare(p2.name);
        })
    }));
  }
}
