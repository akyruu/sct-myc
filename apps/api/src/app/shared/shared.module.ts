import {Module} from '@nestjs/common';
import {SettingsModule} from '../settings';

import {PlayerHelper} from './player.helper';
import {PlayerManager} from './player.manager';
import {RoomEmitter} from './room.emitter';
import {RoomHelper} from './room.helper';
import {RoomService} from './room.service';
import {TeamHelper} from './team.helper';
import {TeamManager} from './team.manager';

@Module({
  providers: [
    PlayerHelper,
    PlayerManager,
    RoomEmitter,
    RoomHelper,
    RoomService,
    TeamHelper,
    TeamManager,
  ],
  imports: [
    SettingsModule,
  ],
  exports: [
    PlayerHelper,
    PlayerManager,
    RoomEmitter,
    RoomHelper,
    RoomService,
    TeamHelper,
    TeamManager,
  ]
})
export class SharedModule {

}
