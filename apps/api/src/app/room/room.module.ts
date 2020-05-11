import {Module} from '@nestjs/common';

import {RoomController} from './room.controller';
import {RoomGateway} from './room.gateway';
import {RoomManager} from './room.manager';
import {RoomService} from './room.service';

@Module({
  controllers: [RoomController],
  providers: [
    RoomGateway,
    RoomManager,
    RoomService
  ]
})
export class RoomModule {}
