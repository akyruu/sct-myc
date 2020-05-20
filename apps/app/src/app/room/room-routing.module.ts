import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {JoinRoomGuard, LeaveRoomGuard, RoomGuard} from './core';
import {LobbyComponent, LobbyGuard} from './lobby';

const routes: Routes = [{
  path: '',
  canActivate: [RoomGuard],
  canDeactivate: [LeaveRoomGuard],
  children: [
    {path: 'lobby', component: LobbyComponent, canActivate: [LobbyGuard]},
    {path: 'rush', loadChildren: () => import('./rush/rush.module').then(m => m.RushModule)}
  ]
},
  {path: 'join/:roomId', canActivate: [JoinRoomGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    // Guard
    JoinRoomGuard,
    LeaveRoomGuard,
    RoomGuard
  ]
})
export class RoomRoutingModule {}
