import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { JoinRoomDialog, PlayerCardComponent } from './components';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    PlayerCardComponent,
    JoinRoomDialog
  ],
  imports: [SharedModule],
  exports: [WelcomeComponent]
})
export class WelcomeModule {}
