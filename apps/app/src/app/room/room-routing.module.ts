import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JoinRoomGuard, LeaveRoomGuard, RoomGuard } from './core';
import { LobbyComponent } from './lobby';

const routes: Routes = [{
  path: 'room',
  canActivate: [RoomGuard],
  canDeactivate: [LeaveRoomGuard],
  children: [
    { path: 'lobby', component: LobbyComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    LeaveRoomGuard,
    RoomGuard
  ]
})
export class RoomRoutingModule {}
