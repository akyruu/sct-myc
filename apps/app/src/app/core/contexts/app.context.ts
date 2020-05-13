import {EventEmitter, Injectable} from '@angular/core';
import {Player, Room} from '@sct-myc/api-interfaces';
import {BehaviorSubject} from 'rxjs';

import {RoomUpdatedEvent, StringLocalStorageItem} from '../models';

@Injectable({providedIn: 'root'})
export class AppContext {
  /* FIELDS ================================================================ */
  readonly playerName = new StringLocalStorageItem('playerName');
  readonly loading = new BehaviorSubject<boolean>(false);

  /* Room ------------------------------------------------------------------ */
  myPlayer: Player;
  room: Room;
  readonly roomChanges = new EventEmitter<RoomUpdatedEvent>();

}
