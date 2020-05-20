import {NgModule} from '@angular/core';

import {SharedModule} from '../shared';
import {JoinRoomDialog, LeaveRoomDialog} from './core';
import {LobbyModule} from './lobby';
import {RoomRoutingModule} from './room-routing.module';

@NgModule({
  declarations: [
    JoinRoomDialog,
    LeaveRoomDialog
  ],
  imports: [
    LobbyModule,
    RoomRoutingModule,
    SharedModule
  ]
})
export class RoomModule {}
