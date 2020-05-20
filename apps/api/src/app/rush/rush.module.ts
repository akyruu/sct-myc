import {Module} from '@nestjs/common';

import {SessionModule} from '../session';
import {SettingsModule} from '../settings';
import {SharedModule} from '../shared';
import {RushGateway} from './rush.gateway';
import {RushManager} from './rush.manager';

@Module({
  imports: [
    SessionModule,
    SettingsModule,
    SharedModule
  ],
  providers: [
    RushGateway,
    RushManager,
  ]
})
export class RushModule {}
