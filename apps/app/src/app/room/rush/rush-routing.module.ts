import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PlayerGuard, PlayerStateGuard, RushGuard, TeamGuard, TeamStateGuard,} from './core';
import {PlayerResolver, RucksacksResolver, TeamResolver, VehiclesResolver} from './core/resolvers';
import {PlayerPrepareComponent} from './player';
import {RushComponent} from './rush.component';
import {TeamPrepareComponent} from './team';

const routes: Routes = [{
  path: '',
  component: RushComponent,
  canActivate: [RushGuard],
  children: [
    {
      path: 'player/:id',
      canActivate: [PlayerGuard],
      resolve: {player: PlayerResolver},
      children: [
        {path: '', canActivate: [PlayerStateGuard]},
        {path: 'prepare', component: PlayerPrepareComponent, resolve: {rucksacks: RucksacksResolver}, data: {state: 'prepare'}}
      ]
    }, {
      path: 'team/:id',
      canActivate: [TeamGuard],
      resolve: {team: TeamResolver},
      children: [
        {path: '', canActivate: [TeamStateGuard]},
        {path: 'prepare', component: TeamPrepareComponent, resolve: {vehicles: VehiclesResolver}, data: {state: 'prepare'}}
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    // Guard
    PlayerGuard,
    PlayerStateGuard,
    RushGuard,
    TeamGuard,
    TeamStateGuard,
    // Resolver
    PlayerResolver,
    RucksacksResolver,
    TeamResolver,
    VehiclesResolver,
  ]
})
export class RushRoutingModule {}
