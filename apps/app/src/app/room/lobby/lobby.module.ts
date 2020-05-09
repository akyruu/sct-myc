import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { LobbyComponent } from './lobby.component';

@NgModule({
  declarations: [LobbyComponent],
  imports: [SharedModule]
})
export class LobbyModule {}
