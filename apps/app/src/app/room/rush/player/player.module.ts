import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared';
import {PlayerPrepareComponent} from './player-prepare.component';

@NgModule({
  declarations: [PlayerPrepareComponent],
  imports: [SharedModule]
})
export class PlayerModule {}
