import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Rucksack} from '@sct-myc/api-interfaces';

import {SettingsService} from '../../../../core';

@Injectable()
export class RucksacksResolver implements Resolve<Rucksack[]> {
  /* CONSTRUCTOR =========================================================== */
  constructor(private _settingsService: SettingsService) {}

  /* METHODS =============================================================== */
  resolve(route: ActivatedRouteSnapshot): Promise<Rucksack[]> {
    return this._settingsService.listRucksacks();
  }
}
