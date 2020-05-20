import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {PlayerRush, TeamRush} from '@sct-myc/api-interfaces';
import {Subscription} from 'rxjs';

import {AppContext} from '../../contexts';
import {SocketService} from '../socket.service';

@Injectable({providedIn: 'root'})
export class RushHandler {
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
      this._socketService.onEvent('rush:team:updated', this._teamUpdated.bind(this)),
      this._socketService.onEvent('rush:team:launched', this._teamLaunched.bind(this)),
      this._socketService.onEvent('rush:player:updated', this._playerUpdated.bind(this)),
    );
  }

  /* Team ------------------------------------------------------------------ */
  /**
   * Event when team updated.
   *
   * @param rush Team rush updated.
   * @private
   */
  private _teamUpdated(rush: TeamRush): void {
    const team = this._appContext.room.teams.find(t => t.id === rush.teamId);
    Object.assign(team.rush, rush);
    this._onTeamRushChanges(team.rush);
  }

  /**
   * Event when team launched.
   *
   * @param data: Team rush and players rush updated.
   * @private
   */
  private _teamLaunched(data: { rush: TeamRush, playersRush: PlayerRush[] }): void {
    const team = this._appContext.room.teams.find(t => t.id === data.rush.teamId);
    Object.assign(team.rush, data.rush);

    data.playersRush.forEach(rush => {
      const player = this._appContext.room.players.find(p => p.id === rush.playerId);
      Object.assign(player.rush, rush);
    });

    const url = this._router.url;
    if (url.startsWith('/room/rush') && url.endsWith('prepare')) {
      this._router.navigate([url.replace('prepare', team.rush.state)]).then();
    } else {
      this._router.navigate(['/room/rush']).then();
    }
  }

  private _onTeamRushChanges(rush: TeamRush): void {
    this._appContext.teamRushChanges.emit(rush);
  }

  /* Player ---------------------------------------------------------------- */
  /**
   * Event when player rush updated.
   *
   * @param rush Player rush updated.
   * @private
   */
  private _playerUpdated(rush: PlayerRush): void {
    const player = this._appContext.room.players.find(p => p.id === rush.playerId);
    Object.assign(player.rush, rush);
    this._onPlayerRushChanges(rush);
  }

  private _onPlayerRushChanges(rush: PlayerRush): void {
    this._appContext.playerRushChanges.emit(rush);
  }

  unbindEvents(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
