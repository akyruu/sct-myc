import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Subscription} from 'rxjs';

@Injectable({providedIn: 'root'})
export class SocketService {
  /* FIELDS ================================================================ */
  readonly exceptionThrowed = this._socket.fromEvent<any>('exception');

  /* CONSTRUCTOR =========================================================== */
  constructor(private _socket: Socket) {}

  /* METHODS =============================================================== */
  connect(namespace?: string): void {
    console.debug('Connection...');
    this._socket.connect();
    if (namespace) {
      this._socket.ioSocket.nsp = namespace;
      console.debug('Connected to ' + namespace + '!');
    } else {
      console.debug('Connected!');
    }
  }

  emitAndWait<T, U>(eventName: string, data?: T): Promise<U> {
    console.debug('Emit ' + eventName + ' with ', data);
    return new Promise<U>((resolve, reject) => {
      const errorListener = error => {
        console.debug('Emit ' + eventName + ' failed!');
        this._socket.removeListener('exception', errorListener);
        reject(error);
      };
      this._socket.on('exception', errorListener);
      this._socket.emit(eventName, data, result => {
        console.debug('Emit ' + eventName + ' with success!');
        this._socket.removeListener('exception', errorListener);
        resolve(result);
      });
    });
  }

  onEvent<T>(eventName: string, observer: (data?: T) => void): Subscription {
    return this._socket.fromEvent<T>(eventName).subscribe(data => {
      console.debug('Receive ' + eventName + ' with ', data);
      observer(data);
    });
  }

  disconnect() {
    console.debug('Disconnection...');
    this._socket.disconnect();
    console.debug('Disconnected!');
  }
}
