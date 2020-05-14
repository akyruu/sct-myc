import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

import {AppContext} from '../../contexts';
import {SocketService} from '../socket.service';

@Injectable({providedIn: 'root'})
export class RushHandler {
  /* FIELDS ================================================================ */
  private readonly _subscriptions: Subscription[] = [];

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _appContext: AppContext,
    private _socketService: SocketService
  ) {}

  /* METHODS =============================================================== */
  bindEvents(): void {
    this._subscriptions.push(/* TODO */);
  }

  unbindEvents(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
