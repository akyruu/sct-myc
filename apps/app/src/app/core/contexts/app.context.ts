import { Injectable } from '@angular/core';
import { Player, Room } from '@sct-myc/api-interfaces';
import { BehaviorSubject } from 'rxjs';

import { StringLocalStorageItem } from '../models/local-storage-item';

@Injectable({ providedIn: 'root' })
export class AppContext {
  /* FIELDS ================================================================ */
  readonly playerName = new StringLocalStorageItem('playerName');
  readonly loading = new BehaviorSubject<boolean>(false);

  /* Room ------------------------------------------------------------------ */
  room: Room;
  myPlayer: Player;
}
