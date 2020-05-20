import {Module} from '@nestjs/common';

import {SessionModule} from '../session';
import {SharedModule} from '../shared';

import {RoomController} from './room.controller';
import {RoomGateway} from './room.gateway';
import {RoomManager} from './room.manager';

@Module({
  controllers: [RoomController],
  imports: [
    SessionModule,
    SharedModule
  ],
  providers: [
    RoomGateway,
    RoomManager
  ]
})
export class RoomModule {}
