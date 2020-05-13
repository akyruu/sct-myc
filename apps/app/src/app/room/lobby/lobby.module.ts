import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import {LobbyMenubarComponent, LobbyPlayersComponent} from './components';
import { LobbyComponent } from './lobby.component';

@NgModule({
    declarations: [
        LobbyComponent,
        LobbyMenubarComponent,
        LobbyPlayersComponent
    ],
  imports: [SharedModule]
})
export class LobbyModule {}
