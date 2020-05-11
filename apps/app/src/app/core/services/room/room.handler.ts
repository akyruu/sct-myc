import { Injectable } from '@angular/core';
import { Player, Team } from '@sct-myc/api-interfaces';
import { Subscription } from 'rxjs';

import { AppContext } from '../../contexts';
import { SocketService } from '../socket.service';

@Injectable({ providedIn: 'root' })
export class RoomHandler {
  /* FIELDS ================================================================ */
  private readonly _subscriptions: Subscription[] = [];

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _appContext: AppContext,
    private _socketService: SocketService
  ) {}

  /* METHODS =============================================================== */
  bindEvents(): void {
    this._subscriptions.push(
      this._socketService.onEvent('room:players', this._players.bind(this)),
      this._socketService.onEvent('room:queue', this._queue.bind(this)),
      this._socketService.onEvent('room:teams', this._teams.bind(this))
    );
  }

  /**
   * Event when player list change.
   *
   * @param players List of players.
   * @private
   */
  private _players(players: Player[]): void {
    this._appContext.room.players = players;
  }

  /**
   * Event when player queue list change.
   *
   * @param queue List of player ids in queue.
   * @private
   */
  private _queue(queue: string[]): void {
    this._appContext.room.queue = queue;
  }


  /**
   * Event when team list change
   *
   * @param teams List of teams.
   * @private
   */
  private _teams(teams: Team[]): void {
    this._appContext.room.teams = teams;
  }

  unbindEvents(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
