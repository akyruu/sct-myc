import {Module} from '@nestjs/common';

import {RoomEmitter} from './room.emitter';
import {RoomService} from './room.service';
import {RushHelper} from './rush.helper';

@Module({
  providers: [
    RoomEmitter,
    RoomService,
    RushHelper
  ],
  exports: [
    RoomEmitter,
    RoomService,
    RushHelper
  ]
})
export class SharedModule {

}
