import {Injectable} from '@angular/core';
import {Rucksack, Vehicle} from '@sct-myc/api-interfaces';

import {SettingsData} from './settings.data';

@Injectable()
export class SettingsService {
  /* FIELDS ================================================================ */
  private readonly _settings = SettingsData;

  /* METHODS =============================================================== */
  findRucksack(id: number): Rucksack {
    return this._settings.rucksacks.find(rucksack => rucksack.id === id);
  }

  listRucksacks(): Rucksack[] {
    return this._settings.rucksacks;
  }

  findVehicle(id: number): Vehicle {
    return this._settings.vehicles.find(vehicle => vehicle.id === id);
  }

  listVehicles(): Vehicle[] {
    return this._settings.vehicles;
  }
}
