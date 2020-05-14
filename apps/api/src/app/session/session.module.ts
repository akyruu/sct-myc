import {Module} from '@nestjs/common';

import {SessionGuard} from './session.guard';
import {SessionService} from './session.service';

@Module({
  providers: [
    SessionGuard,
    SessionService
  ],
  exports: [
    SessionGuard,
    SessionService,
  ],
})
export class SessionModule {}
