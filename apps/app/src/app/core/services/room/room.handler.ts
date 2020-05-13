import {Injectable} from '@angular/core';
import {Player, Room, Team} from '@sct-myc/api-interfaces';
import {Subscription} from 'rxjs';

import {AppContext} from '../../contexts';
import {RoomField} from '../../models';
import {SocketService} from '../socket.service';

@Injectable({providedIn: 'root'})
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
      this._socketService.onEvent('room:updated', this._roomUpdated.bind(this)),
      this._socketService.onEvent('room:players', this._players.bind(this)),
      this._socketService.onEvent('room:queue', this._queue.bind(this)),
      this._socketService.onEvent('room:teams', this._teams.bind(this))
    );
  }

  /**
   * Event when room updated.
   *
   * @param room Room updated.
   * @private
   */
  private _roomUpdated(room: Room): void {
    Object.assign(this._appContext.room, room);
    this._onChanges();
  }

  /**
   * Event when player list change.
   *
   * @param players List of players.
   * @private
   */
  private _players(players: Player[]): void {
    this._appContext.room.players = players;
    this._onChanges({name: 'players', value: players});
  }

  /**
   * Event when player queue list change.
   *
   * @param queue List of player ids in queue.
   * @private
   */
  private _queue(queue: string[]): void {
    this._appContext.room.queue = queue;
    this._onChanges({name: 'queue', value: queue});
  }


  /**
   * Event when team list change
   *
   * @param teams List of teams.
   * @private
   */
  private _teams(teams: Team[]): void {
    this._appContext.room.teams = teams;
    this._onChanges({name: 'teams', value: teams});
  }

  unbindEvents(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /* Changes --------------------------------------------------------------- */
  private _onChanges(...fields: RoomField[]): void {
    this._appContext.roomChanges.emit({
      room: this._appContext.room,
      fieldNames: fields.map(field => field.name),
      fields: fields
    });
  }
}
