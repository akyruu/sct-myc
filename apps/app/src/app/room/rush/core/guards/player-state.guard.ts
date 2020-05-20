import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import {AppContext} from '../../../../core';

@Injectable()
export class PlayerStateGuard implements CanActivate {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _router: Router,
    private _appContext: AppContext,
  ) {}

  /* METHODS =============================================================== */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree {
    const playerId = <string>route.params.id;
    const player = this._appContext.room.players.find(player => player.id === playerId);
    const teamId = player.teamId;
    const team = this._appContext.room.teams.find(team => team.id === teamId);
    return this._router.parseUrl(state.url + '/' + team.rush.state);
  }
}
