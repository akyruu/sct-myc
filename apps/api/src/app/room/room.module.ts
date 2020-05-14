import {Module} from '@nestjs/common';

import {SessionModule} from '../session';
import {SharedModule} from '../shared';

import {PlayerHelper} from './player.helper';
import {PlayerManager} from './player.manager';
import {RoomController} from './room.controller';
import {RoomGateway} from './room.gateway';
import {RoomManager} from './room.manager';
import {TeamManager} from './team.manager';

@Module({
  controllers: [RoomController],
  imports: [
    SessionModule,
    SharedModule
  ],
  providers: [
    PlayerHelper,
    PlayerManager,
    RoomGateway,
    RoomManager,
    TeamManager
  ]
})
export class RoomModule {}
