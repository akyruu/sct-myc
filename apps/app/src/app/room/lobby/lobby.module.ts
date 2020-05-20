import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared';
import {LobbyMenubarComponent, LobbyPlayersComponent} from './components';
import {LobbyGuard} from './guards';
import {LobbyComponent} from './lobby.component';

@NgModule({
  declarations: [
    LobbyComponent,
    LobbyMenubarComponent,
    LobbyPlayersComponent
  ],
  imports: [SharedModule],
  providers: [LobbyGuard]
})
export class LobbyModule {}
