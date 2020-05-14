import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LeaveRoomGuard, RoomGuard} from './core';
import {LobbyComponent} from './lobby';
import {RushComponent} from './rush';

const routes: Routes = [{
  path: 'room',
  canActivate: [RoomGuard],
  canDeactivate: [LeaveRoomGuard],
  children: [
    {path: 'lobby', component: LobbyComponent},
    {path: 'rush', component: RushComponent}
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
