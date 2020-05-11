import {ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import {Room, RoomOptions} from '@sct-myc/api-interfaces';
import {Socket} from 'socket.io';
import {TransWsException} from '../commons';
import {RoomManager} from './room.manager';
import {RoomService} from './room.service';

@WebSocketGateway()
export class RoomGateway implements OnGatewayDisconnect {
  /* FIELDS ================================================================ */
  private readonly _sessions = new Map<string, { playerName: string, roomId: string }>();

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _roomManager: RoomManager,
    private _roomService: RoomService
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
    const room = this._roomManager.createRoom(options.playerName);
    client.join(room.id);
    this._sessions.set(client.id, {playerName: options.playerName, roomId: room.id});
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
    } else if (room.players.includes(playerName)) {
      throw new TransWsException(
        'Player <' + playerName + '> already exists in room <' + roomId + '>.',
        'playerAlreadyExists',
        {roomId: roomId, playerName: playerName}
      );
    }
    room = this._roomManager.addPlayer(client, playerName, data.roomId);
    client.join(room.id);
    this._sessions.set(client.id, {playerName: playerName, roomId: room.id});

    return room;
  }

  @SubscribeMessage('room:leave')
  onLeaveRoom(@ConnectedSocket() client: Socket): void {
    this._leaveRoom(client);
  }

  /* Team ------------------------------------------------------------------ */
  @SubscribeMessage('room:team:add')
  onAddTeam(@ConnectedSocket() client: Socket): void {
    const roomId = this._sessions.get(client.id).roomId;
    this._roomManager.addTeam(client, roomId);
  }

  /* Tools ----------------------------------------------------------------- */
  private _leaveRoom(client: Socket): void {
    const session = this._sessions.get(client.id);
    if (session) {
      client.leave(session.roomId);
      this._roomManager.leaveRoom(client, session.playerName, session.roomId);
      this._sessions.delete(client.id);
    }
  }
}
