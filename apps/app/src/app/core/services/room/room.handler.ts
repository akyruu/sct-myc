import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { SocketService } from '../socket.service';

@Injectable({ providedIn: 'root' })
export class RoomHandler {
  /* FIELDS ================================================================ */
  private readonly _subscriptions: Subscription[] = [];

  /* CONSTRUCTOR =========================================================== */
  constructor(private _socketService: SocketService) {}

  /* METHODS =============================================================== */
  bindEvents(): void {
    this._subscriptions.push(
      this._socketService.onEvent('room:playerAdded', this._playerAdded.bind(this))
    );
  }

  /**
   * Event when a player is added
   * @private
   */
  private _playerAdded(): void {
    // TODO
  }

  unbindEvents(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
