import {Injectable} from '@angular/core';

import {SocketService} from '../socket.service';

@Injectable({providedIn: 'root'})
export class RushService {
  /* CONSTRUCTOR =========================================================== */
  constructor(private _socketService: SocketService) {}

  /* METHODS =============================================================== */

  /* Team ------------------------------------------------------------------ */
  /**
   * Launch rush for team in current room.
   *
   * @param teamId Team to update.
   */
  teamLaunch(teamId: number): Promise<void> {
    return this._socketService.emitAndWait('rush:team:launch', teamId);
  }

  /**
   * Changes the vehicle for team in current room.
   *
   * @param teamId Team to update.
   * @param vehicleId Vehicle to set (maybe undefined).
   */
  teamSetVehicle(teamId: number, vehicleId: number): Promise<void> {
    return this._socketService.emitAndWait('rush:team:setVehicle', {teamId: teamId, vehicleId: vehicleId});
  }

  /* Player ---------------------------------------------------------------- */
  /**
   * Tags player is ready for rush in current room.
   *
   * @param playerId Player to update.
   * @param ready If player is ready.
   */
  playerSetReady(playerId: string, ready: boolean): Promise<void> {
    return this._socketService.emitAndWait('rush:player:setReady', {playerId: playerId, ready: ready});
  }

  /**
   * Changes the rucksack type for player in current room.
   *
   * @param playerId Player to update.
   * @param rucksackId Rucksack to set (maybe undefined).
   */
  playerSetRucksackType(playerId: string, rucksackId: number): Promise<void> {
    return this._socketService.emitAndWait('rush:player:setRucksackType', {playerId: playerId, rucksackId: rucksackId});
  }
}
