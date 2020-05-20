import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared';
import {RushContext, RushSidenavComponent} from './core';
import {PlayerModule} from './player';
import {RushRoutingModule} from './rush-routing.module';
import {RushComponent} from './rush.component';
import {TeamModule} from './team';

@NgModule({
  declarations: [
    RushComponent,
    RushSidenavComponent
  ],
  imports: [
    RouterModule,
    PlayerModule,
    RushRoutingModule,
    SharedModule,
    TeamModule,
  ],
  providers: [RushContext]
})
export class RushModule {}
