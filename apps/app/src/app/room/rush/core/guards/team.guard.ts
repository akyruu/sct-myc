import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

import {AppContext} from '../../../../core';
import {RushContext} from '../contexts';

@Injectable()
export class TeamGuard implements CanActivate {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _router: Router,
    private _translate: TranslateService,
    private _appContext: AppContext,
    private _rushContext: RushContext,
  ) {}

  /* METHODS =============================================================== */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean {
    const teamId = +route.params.id;
    return teamId && !!this._appContext.room.teams.find(team => team.id = teamId);
  }
}
