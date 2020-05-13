import {UseGuards} from '@nestjs/common';
import {ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import {Room, RoomOptions} from '@sct-myc/api-interfaces';
import {Socket} from 'socket.io';

import {TransWsException} from '../commons';
import {PlayerHelper} from './player.helper';
import {PlayerManager} from './player.manager';
import {RoomManager} from './room.manager';
import {RoomService} from './room.service';
import {SessionGuard} from './session.guard';
import {SessionService} from './session.service';
import {TeamManager} from './team.manager';

@WebSocketGateway()
export class RoomGateway implements OnGatewayDisconnect {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _playerHelper: PlayerHelper,
    private _playerManager: PlayerManager,
    private _roomManager: RoomManager,
    private _roomService: RoomService,
    private _sessionService: SessionService,
    private _teamManager: TeamManager
  ) {}

  /* METHODS =============================================================== */
  handleDisconnect(client: Socket): void {
    this._leaveRoom(client);
  }

  /* Events ---------------------------------------------------------------- */
  @SubscribeMessage('room:create')
  onCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() options: RoomOptions
  ): Room {
    const player = this._playerHelper.createPlayer(client, options.playerName);
    const room = this._roomManager.createRoom(client, player);
    this._sessionService.create(client, player, room);
    return room;
  }

  @SubscribeMessage('room:join')
  onJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string, options: RoomOptions }
  ): Room {
    const playerName = data.options.playerName;
    const roomId = data.roomId;

    let room = this._roomService.read(roomId);
    if (!room) {
      throw new TransWsException(
        'Room <' + roomId + '> not found.',
        'roomNotFound',
        {roomId: roomId}
      );
    } else if (room.players.find(p => p.name === playerName)) {
      throw new TransWsException(
        'Player <' + playerName + '> already exists in room <' + roomId + '>.',
        'playerAlreadyExists',
        {roomId: roomId, playerName: playerName}
      );
    }

    const player = this._playerHelper.createPlayer(client, playerName);
    room = this._roomManager.joinRoom(client, player, data.roomId);
    this._sessionService.create(client, player, room);

    return room;
  }

  @UseGuards(SessionGuard)
  @SubscribeMessage('room:leave')
  onLeaveRoom(@ConnectedSocket() client: Socket): void {
    this._leaveRoom(client);
  }

  /* Player ---------------------------------------------------------------- */
  @UseGuards(SessionGuard)
  @SubscribeMessage('room:player:setTeam')
  onPlayerSetTeam(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { playerId: string, teamId?: number }
  ): void {
    const roomId = this._sessionService.get(client).roomId;
    this._playerManager.setTeam(client, roomId, data.playerId, data.teamId);
  }

  /* Team ------------------------------------------------------------------ */
  @UseGuards(SessionGuard)
  @SubscribeMessage('room:team:add')
  onAddTeam(@ConnectedSocket() client: Socket): void {
    const roomId = this._sessionService.get(client).roomId;
    this._roomManager.addTeam(client, roomId);
  }

  @UseGuards(SessionGuard)
  @SubscribeMessage('room:team:leader')
  onTeamSetLeader(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { playerId: string, teamId?: number }
  ): void {
    const roomId = this._sessionService.get(client).roomId;
    this._teamManager.setLeader(client, roomId, data.playerId, data.teamId);
  }

  @UseGuards(SessionGuard)
  @SubscribeMessage('room:team:remove')
  onRemoveTeam(
    @ConnectedSocket() client: Socket,
    @MessageBody() teamId: number
  ): void {
    const roomId = this._sessionService.get(client).roomId;
    this._roomManager.removeTeam(client, roomId, teamId);
  }

  /* Tools ----------------------------------------------------------------- */
  private _leaveRoom(client: Socket): void {
    const session = this._sessionService.get(client);
    if (session) {
      client.leave(session.roomId);
      this._roomManager.leaveRoom(client, session.playerId, session.roomId);
      this._sessionService.delete(client);
    }
  }
}
