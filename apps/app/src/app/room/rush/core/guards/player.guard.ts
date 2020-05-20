import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AppContext} from '../../../../core';

@Injectable()
export class PlayerGuard implements CanActivate {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _router: Router,
    private _appContext: AppContext,
  ) {}

  /* METHODS =============================================================== */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const playerId = <string>route.params.id;
    return playerId && !!this._appContext.room.players.find(player => player.id === playerId);
  }
}
