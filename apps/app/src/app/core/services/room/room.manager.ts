import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {RoomOptions} from '@sct-myc/api-interfaces';

import {AppContext} from '../../contexts';
import {SocketService} from '../socket.service';
import {RoomHandler} from './room.handler';
import {RoomService} from './room.service';

@Injectable({providedIn: 'root'})
export class RoomManager {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _router: Router,
    private _appContext: AppContext,
    private _roomService: RoomService,
    private _roomHandler: RoomHandler,
    private _socketService: SocketService
  ) {}

  /* METHODS =============================================================== */
  /**
   * Create a new room.
   *
   * @param options Room options.
   */
  async createRoom(options: RoomOptions): Promise<void> {
    this._socketService.connect();

    const room = await this._roomService.createRoom(options);
    this._appContext.room = room;
    this._appContext.myPlayerId = room.players.find(player => player.name === options.playerName).id;
    this._roomHandler.bindEvents();

    this._router.navigate(['/room/lobby']).then();
  }

  /**
   * Join an existing room.
   *
   * @param roomId Identifier of room to join.
   * @param playerName Player name.
   */
  async joinRoom(roomId: string, playerName: string): Promise<void> {
    this._socketService.connect();

    const room = await this._roomService.joinRoom(roomId, {playerName: playerName});
    this._appContext.room = room;
    this._appContext.myPlayerId = room.players.find(player => player.name === playerName).id;
    this._roomHandler.bindEvents();

    if (room.started) {
      // TODO
    } else {
      this._router.navigate(['/room/lobby']).then();
    }
  }

  /**
   * Leave current room.
   */
  async leaveRoom(): Promise<void> {
    this._roomHandler.unbindEvents();
    this._appContext.room = null;
    this._roomService.leaveRoom().then();
  }
}
