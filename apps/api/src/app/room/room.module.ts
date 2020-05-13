import {Module} from '@nestjs/common';

import {PlayerHelper} from './player.helper';
import {PlayerManager} from './player.manager';
import {RoomController} from './room.controller';
import {RoomEmitter} from './room.emitter';
import {RoomGateway} from './room.gateway';
import {RoomManager} from './room.manager';
import {RoomService} from './room.service';
import {SessionGuard} from './session.guard';
import {SessionService} from './session.service';
import {TeamManager} from './team.manager';

@Module({
  controllers: [RoomController],
  providers: [
    PlayerHelper,
    PlayerManager,
    RoomGateway,
    RoomEmitter,
    RoomManager,
    RoomService,
    SessionGuard,
    SessionService,
    TeamManager,
  ]
})
export class RoomModule {}
