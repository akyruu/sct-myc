import {EventEmitter, Injectable} from '@angular/core';
import {Player, PlayerRush, Room, TeamRush} from '@sct-myc/api-interfaces';
import {BehaviorSubject} from 'rxjs';

import {RoomUpdatedEvent, StringStorageItem} from '../models';

@Injectable({providedIn: 'root'})
export class AppContext {
  /* FIELDS ================================================================ */
  /* Local ----------------------------------------------------------------- */
  readonly playerName = new StringStorageItem('local', 'playerName');

  /* Session --------------------------------------------------------------- */
  readonly roomId = new StringStorageItem('session', 'roomId');
  readonly playerId = new StringStorageItem('session', 'playerId');

  /* Execution ------------------------------------------------------------- */
  readonly loading = new BehaviorSubject<boolean>(false);
  error = false; // Use this indicator for bypass deactivate guard

  /* Room */
  room: Room;
  player: Player;

  readonly roomChanges = new EventEmitter<RoomUpdatedEvent>();
  readonly teamRushChanges = new EventEmitter<TeamRush>();
  readonly playerRushChanges = new EventEmitter<PlayerRush>();
}
