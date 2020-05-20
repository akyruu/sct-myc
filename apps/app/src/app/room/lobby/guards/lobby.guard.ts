import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';

import {AppContext} from '../../../core';

@Injectable()
export class LobbyGuard implements CanActivate {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _router: Router,
    private _appContext: AppContext,
  ) {}

  /* METHODS =============================================================== */
  canActivate(route: ActivatedRouteSnapshot): UrlTree | boolean {
    if (this._appContext.room.started) {
      return this._router.parseUrl('/room/rush');
    }
    return true;
  }
}
