import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import {AppContext} from '../../../../core';

@Injectable()
export class TeamStateGuard implements CanActivate {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _router: Router,
    private _appContext: AppContext,
  ) {}

  /* METHODS =============================================================== */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree {
    const teamId = +route.params.id;
    const team = this._appContext.room.teams.find(team => team.id = teamId);
    return this._router.parseUrl(state.url + '/' + team.rush.state);
  }
}
