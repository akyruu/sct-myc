import { Injectable } from '@angular/core';
import { Room } from '@sct-myc/api-interfaces';
import { BehaviorSubject } from 'rxjs';

import { StringLocalStorageItem } from '../models/local-storage-item';

@Injectable({ providedIn: 'root' })
export class AppContext {
  /* FIELDS ================================================================ */
  readonly playerName = new StringLocalStorageItem('playerName');
  room: Room;

  readonly loading = new BehaviorSubject<boolean>(false);
}
