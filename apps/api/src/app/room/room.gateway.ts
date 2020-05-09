import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Room, RoomOptions } from '@sct-myc/api-interfaces';
import { Socket } from 'socket.io';
import { TransWsException } from '../commons';

import { RoomService } from './room.service';

@WebSocketGateway()
export class RoomGateway implements OnGatewayDisconnect {
  /* FIELDS ================================================================ */
  private readonly _sessions = new Map<string, { playerName: string, roomId: string }>();

  /* CONSTRUCTOR =========================================================== */
  constructor(private _roomService: RoomService) {}

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
    const room = this._roomService.create(options.playerName);
    client.join(room.id);
    this._sessions.set(client.id, { playerName: options.playerName, roomId: room.id });
    return room;
  }

  @SubscribeMessage('room:join')
  onJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string, options: RoomOptions }
  ): Room {
    const roomId = data.roomId;
    const playerName = data.options.playerName;

    const room = this._roomService.findById(roomId);
    if (!room) {
      throw new TransWsException(
        'Room <' + roomId + '> not found.',
        'roomNotFound',
        { roomId: roomId }
      );
    } else if (room.players.includes(playerName)) {
      throw new TransWsException(
        'Player <' + playerName + '> already exists in room <' + roomId + '>.',
        'playerAlreadyExists',
        { roomId: roomId, playerName: playerName }
      );
    }

    client.join(room.id);
    this._sessions.set(client.id, { playerName: playerName, roomId: room.id });

    this._roomService.addPlayer(playerName, roomId);
    client.in(room.id).broadcast.emit('playerJoined', playerName);

    return room;
  }

  @SubscribeMessage('room:leave')
  onLeaveRoom(@ConnectedSocket() client: Socket): void {
    this._leaveRoom(client);
  }

  /* Tools ----------------------------------------------------------------- */
  private _leaveRoom(client: Socket): void {
    const session = this._sessions.get(client.id);
    if (session) {
      const room = this._roomService.findById(session.roomId);
      if (room) {
        client.leave(session.roomId);
        this._roomService.deletePlayer(session.playerName, session.roomId);
        const players = this._roomService.findAllPlayers(session.roomId);
        if (players.length === 0) {
          this._roomService.deleteRoom(session.roomId);
        }
      }
    }
  }
}
