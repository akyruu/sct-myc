import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ErrorGuard, ErrorNotFoundComponent} from './error';
import {WelcomeComponent} from './welcome';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'room', loadChildren: () => import('./room/room.module').then(m => m.RoomModule)},
  {path: '**', component: ErrorNotFoundComponent, canActivate: [ErrorGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
