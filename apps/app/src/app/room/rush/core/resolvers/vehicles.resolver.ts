import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Vehicle} from '@sct-myc/api-interfaces';

import {SettingsService} from '../../../../core';

@Injectable()
export class VehiclesResolver implements Resolve<Vehicle[]> {
  /* CONSTRUCTOR =========================================================== */
  constructor(private _settingsService: SettingsService) {}

  /* METHODS =============================================================== */
  resolve(route: ActivatedRouteSnapshot): Promise<Vehicle[]> {
    return this._settingsService.listVehicles();
  }
}
