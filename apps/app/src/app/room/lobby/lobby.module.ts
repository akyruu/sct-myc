import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { LobbyMenubarComponent } from './components';
import { LobbyComponent } from './lobby.component';

@NgModule({
  declarations: [
    LobbyComponent,
    LobbyMenubarComponent
  ],
  imports: [SharedModule]
})
export class LobbyModule {}
