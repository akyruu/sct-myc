import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {
  /* FIELDS ================================================================ */
  readonly exceptionThrowed = this._socket.fromEvent<any>('exception');

  /* CONSTRUCTOR =========================================================== */
  constructor(private _socket: Socket) {}

  /* METHODS =============================================================== */
  connect(namespace?: string): void {
    this._socket.connect();
    if (namespace) {
      this._socket.ioSocket.nsp = namespace;
    }
  }

  emitAndWait<T, U>(eventName: string, data?: T): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      const errorListener = error => {
        this._socket.removeListener('exception', errorListener);
        reject(error);
      };
      this._socket.on('exception', errorListener);
      this._socket.emit(eventName, data, result => {
        this._socket.removeListener('exception', errorListener);
        resolve(result);
      });
    });
  }

  onEvent<T>(eventName: string, observer: (data?: T) => void): Subscription {
    return this._socket.fromEvent<T>(eventName).subscribe(observer);
  }

  disconnect() {
    this._socket.disconnect();
  }
}
