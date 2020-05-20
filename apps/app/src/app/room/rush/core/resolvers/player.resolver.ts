import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Player} from '@sct-myc/api-interfaces';

import {AppContext} from '../../../../core';
import {RushContext} from '../contexts';

@Injectable()
export class PlayerResolver implements Resolve<Player> {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _router: Router,
    private _translate: TranslateService,
    private _appContext: AppContext,
    private _rushContext: RushContext
  ) {}

  /* METHODS =============================================================== */
  resolve(route: ActivatedRouteSnapshot): Player {
    const player = this._appContext.room.players.find(p => p.id === route.params.id);
    this._rushContext.title.next(this._translate.instant('room.rush.player.title', player));
    return player;
  }
}
