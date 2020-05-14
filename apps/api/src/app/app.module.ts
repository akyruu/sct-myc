import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {RoomModule} from './room/room.module';
import {RushModule} from './rush/rush.module';

@Module({
  imports: [
    RoomModule,
    RushModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
