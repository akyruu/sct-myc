import { Component, OnInit } from '@angular/core';
import { Player, Room, Team } from '@sct-myc/api-interfaces';

import { AppContext, RoomService } from '../../core';

@Component({
  selector: 'sct-myc-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  /* FIELDS ================================================================ */
  room: Room;
  myPlayer: Player;

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _appContext: AppContext,
    private _roomService: RoomService
  ) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this.room = this._appContext.room;
    this.myPlayer = this._appContext.myPlayer;
  }

  /* View ------------------------------------------------------------------ */
  get queue(): Player[] {
    return this.room.players.filter(player => this.room.queue.includes(player.id));
  }

  getTeamPlayers(team: Team): Player[] {
    return this.room.players.filter(player => player.teamId === team.id);
  }

  /* Events ---------------------------------------------------------------- */
  doAddTeam(): void {
    this._roomService.addTeam().then();
  }

  doRemoveTeam(team: Team) {
    this._roomService.removeTeam(team.id).then();
  }
}
