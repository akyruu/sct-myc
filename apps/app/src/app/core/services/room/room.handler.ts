import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
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
    private _router: Router,
    private _appContext: AppContext,
    private _socketService: SocketService
  ) {}

  /* METHODS =============================================================== */
  bindEvents(): void {
    this._subscriptions.push(
      this._socketService.onEvent('room:updated', this._roomUpdated.bind(this)),
      this._socketService.onEvent('room:player:updated', this._playerUpdated.bind(this)),
      this._socketService.onEvent('room:players', this._players.bind(this)),
      this._socketService.onEvent('room:queue', this._queue.bind(this)),
      this._socketService.onEvent('room:team:updated', this._teamUpdated.bind(this)),
      this._socketService.onEvent('room:teams', this._teams.bind(this)),
      this._socketService.onEvent('room:rush:started', this._rushStarted.bind(this)),
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
   * Event when player updated.
   *
   * @param player Player updated.
   * @private
   */
  private _playerUpdated(player: Player): void {
    Object.assign(this._appContext.room.players.find(p => p.id === player.id), player);
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
    this._appContext.player = players.find(player => player.id === this._appContext.playerId.value);
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
   * Event when team updated.
   *
   * @param team Team updated.
   * @private
   */
  private _teamUpdated(team: Team): void {
    Object.assign(this._appContext.room.teams.find(t => t.id === team.id), team);
    this._onChanges();
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

  /**
   * Event when rush started.
   *
   * @param room Room updated.
   * @private
   */
  private _rushStarted(room: Room): void {
    Object.assign(this._appContext.room, room);
    this._router.navigate(['/room/rush']).then();
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
