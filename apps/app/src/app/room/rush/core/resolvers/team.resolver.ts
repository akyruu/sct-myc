import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Team} from '@sct-myc/api-interfaces';

import {AppContext} from '../../../../core';
import {RushContext} from '../contexts';

@Injectable()
export class TeamResolver implements Resolve<Team> {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _router: Router,
    private _translate: TranslateService,
    private _appContext: AppContext,
    private _rushContext: RushContext,
  ) {}

  /* METHODS =============================================================== */
  resolve(route: ActivatedRouteSnapshot): Team {
    const team = this._appContext.room.teams.find(t => t.id === +route.params.id);
    this._rushContext.title.next(this._translate.instant('room.rush.team.title', team));
    return team;
  }
}
