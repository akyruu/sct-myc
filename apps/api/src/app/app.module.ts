import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {RoomModule} from './room/room.module';
import {RushModule} from './rush/rush.module';
import {SettingsModule} from './settings';

@Module({
  imports: [
    RoomModule,
    RushModule,
    SettingsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
