import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Rucksack, Vehicle} from '@sct-myc/api-interfaces';

@Injectable({providedIn: 'root'})
export class SettingsService {
  /* CONSTRUCTOR =========================================================== */
  constructor(private _http: HttpClient) {}

  /* METHODS =============================================================== */
  listRucksacks(): Promise<Rucksack[]> {
    return this._http.get<Rucksack[]>('/api/settings/rucksacks').toPromise();
  }

  listVehicles(): Promise<Vehicle[]> {
    return this._http.get<Vehicle[]>('/api/settings/vehicles').toPromise();
  }
}
