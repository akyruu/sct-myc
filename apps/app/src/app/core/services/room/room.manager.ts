import {Injectable} from '@angular/core';
import {Router, UrlTree} from '@angular/router';
import {Room, RoomOptions} from '@sct-myc/api-interfaces';

import {AppContext} from '../../contexts';
import {RushHandler} from '../rush';
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
    private _rushHandler: RushHandler,
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
    this._updateContext(room, {name: options.playerName});

    this._navigateToRoom(room);
  }

  /**
   * Join an existing room.
   *
   * @param roomId Identifier of room to join.
   * @param playerName Player name.
   */
  async joinRoom(roomId: string, playerName: string): Promise<void> {
    this._socketService.connect();

    const room = await this._roomService.joinRoom(roomId, playerName);
    this._updateContext(room, {name: playerName});

    this._navigateToRoom(room);
  }

  /**
   * Re-join the last room where player connected.
   *
   * @param roomId Identifier of room to join.
   * @param playerId Identifier of player.
   * @param navigate Navigate after rejoin if success (true by default)
   */
  async rejoinRoom(roomId: string, playerId: string, navigate = true): Promise<void> {
    this._socketService.connect();

    const room = await this._roomService.rejoinRoom(roomId, playerId);
    this._updateContext(room, {id: playerId});

    if (navigate) {
      this._navigateToRoom(room);
    }
  }

  /**
   * Leave current room.
   */
  async leaveRoom(): Promise<void> {
    // Leave room on server
    this._roomService.leaveRoom().then();

    // Clean context
    this._appContext.roomId.clear();
    this._appContext.room = undefined;
    this._appContext.playerId.clear();
    this._appContext.player = undefined;

    // Unbind events
    this._roomHandler.unbindEvents();
    this._rushHandler.unbindEvents();
  }

  /* Tools ----------------------------------------------------------------- */
  private _updateContext(room: Room, player: { id?: string, name?: string }): void {
    this._appContext.roomId.value = room.id;
    this._appContext.room = room;

    const p = room.players.find(p => p.id === player.id || p.name === player.name);
    this._appContext.playerId.value = p.id;
    this._appContext.player = p;

    this._roomHandler.bindEvents();
    this._rushHandler.bindEvents();
  }

  private _navigateToRoom(room: Room): void {
    this._router.navigate(room.started ? ['/room', room.started ? 'rush' : 'lobby'] : ['/room/lobby']).then();
  }
}
