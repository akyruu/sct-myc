import {Controller, Get} from '@nestjs/common';
import {Rucksack, Vehicle} from '@sct-myc/api-interfaces';

import {SettingsService} from './settings.service';

@Controller('/settings')
export class SettingsController {
  /* CONSTRUCTOR =========================================================== */
  constructor(private _settingsService: SettingsService) {}

  /* METHODS =============================================================== */
  @Get('/rucksacks')
  listRucksacks(): Rucksack[] {
    return this._settingsService.listRucksacks();
  }

  @Get('/vehicles')
  listVehicles(): Vehicle[] {
    return this._settingsService.listVehicles();
  }
}
