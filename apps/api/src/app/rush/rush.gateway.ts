import {UseGuards} from '@nestjs/common';
import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import {Socket} from 'socket.io';
import {SessionGuard, SessionService} from '../session';

import {PlayerManager, TeamManager} from '../shared';

@UseGuards(SessionGuard)
@WebSocketGateway()
export class RushGateway {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _playerManager: PlayerManager,
    private _sessionService: SessionService,
    private _teamManager: TeamManager
  ) {}

  /* METHODS =============================================================== */

  /* Team ------------------------------------------------------------------ */
  @SubscribeMessage('rush:team:launch')
  onTeamLaunch(
    @ConnectedSocket() client: Socket,
    @MessageBody() teamId: number
  ): void {
    const roomId = this._sessionService.get(client).roomId;
    this._teamManager.launch(client, roomId, teamId);
  }

  @SubscribeMessage('rush:team:setVehicle')
  onTeamSetVehicle(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { teamId: number, vehicleId: number }
  ): void {
    const roomId = this._sessionService.get(client).roomId;
    this._teamManager.setVehicle(client, roomId, data.teamId, data.vehicleId);
  }

  /* Player ---------------------------------------------------------------- */
  @SubscribeMessage('rush:player:setReady')
  onPlayerSetReady(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { playerId: string, ready: boolean }
  ): void {
    const roomId = this._sessionService.get(client).roomId;
    this._playerManager.setReady(client, roomId, data.playerId, data.ready);
  }

  @SubscribeMessage('rush:player:setRucksackType')
  onPlayerSetRucksackType(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { playerId: string, rucksackId: number }
  ): void {
    const roomId = this._sessionService.get(client).roomId;
    this._playerManager.setRucksackType(client, roomId, data.playerId, data.rucksackId);
  }
}
