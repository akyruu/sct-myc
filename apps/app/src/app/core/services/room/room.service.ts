import {Injectable} from '@angular/core';
import {Room, RoomOptions} from '@sct-myc/api-interfaces';

import {SocketService} from '../socket.service';

@Injectable({providedIn: 'root'})
export class RoomService {
  /* CONSTRUCTOR =========================================================== */
  constructor(private _socketService: SocketService) {}

  /* METHODS =============================================================== */
  /**
   * Create a new room.
   *
   * @param options Room options.
   */
  createRoom(options: RoomOptions): Promise<Room> {
    return this._socketService.emitAndWait('room:create', options);
  }

  /**
   * Join an existing room.
   *
   * @param roomId Identifier of room to join.
   * @param playerName Name of player.
   */
  joinRoom(roomId: string, playerName: string): Promise<Room> {
    return this._socketService.emitAndWait('room:join', {roomId: roomId, playerName: playerName});
  }

  /**
   * Re-join the last room where player connected.
   *
   * @param roomId Identifier of room to join.
   * @param playerId Identifier of player.
   */
  async rejoinRoom(roomId: string, playerId: string): Promise<Room> {
    return this._socketService.emitAndWait('room:rejoin', {roomId: roomId, playerId: playerId});
  }

  /**
   * Leave current room.
   */
  leaveRoom(): Promise<void> {
    return this._socketService.emitAndWait('room:leave');
  }

  /* Player ---------------------------------------------------------------- */
  /**
   * Affect or detach player from/to a team.
   *
   * @param playerId Id of player to update.
   * @param teamId Affected team (or null for detach)
   */
  playerSetTeam(playerId: string, teamId?: number): Promise<void> {
    return this._socketService.emitAndWait('room:player:setTeam', {playerId: playerId, teamId: teamId});
  }

  /* Team ------------------------------------------------------------------ */
  /**
   * Create a new team in current room.
   */
  addTeam(): Promise<void> {
    return this._socketService.emitAndWait('room:team:add');
  }

  /**
   * Set team leader in current room.
   *
   * @param playerId
   * @param teamId
   */
  teamSetLeader(playerId: string, teamId: number): Promise<void> {
    return this._socketService.emitAndWait('room:team:leader', {playerId: playerId, teamId: teamId});
  }

  /**
   * Remove a team in current room.
   *
   * @param teamId Identifier of team to remove
   */
  removeTeam(teamId: number): Promise<void> {
    return this._socketService.emitAndWait('room:team:remove', teamId);
  }

  /* Rush ------------------------------------------------------------------ */
  /**
   * Start the rush session.
   */
  startRush(): Promise<void> {
    return this._socketService.emitAndWait('room:rush:start');
  }
}
