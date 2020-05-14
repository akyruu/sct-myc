import {NgModule} from '@angular/core';

import {SharedModule} from '../shared';
import {JoinRoomDialog, LeaveRoomDialog} from './core';
import {LobbyModule} from './lobby/lobby.module';
import {RoomRoutingModule} from './room-routing.module';
import {RushModule} from './rush';

@NgModule({
  declarations: [
    JoinRoomDialog,
    LeaveRoomDialog
  ],
  imports: [
    LobbyModule,
    RoomRoutingModule,
    RushModule,
    SharedModule
  ]
})
export class RoomModule {}
