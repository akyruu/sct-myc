import { Module } from '@nestjs/common';

import { PlayerHelper } from './player.helper';
import { RoomController } from './room.controller';
import { RoomGateway } from './room.gateway';
import { RoomManager } from './room.manager';
import { RoomService } from './room.service';

@Module({
  controllers: [RoomController],
  providers: [
    PlayerHelper,
    RoomGateway,
    RoomManager,
    RoomService
  ]
})
export class RoomModule {}
