import {NgModule} from '@angular/core';

import {SharedModule} from '../shared';
import {ErrorNotFoundComponent} from './components';
import {ErrorGuard} from './guards';

@NgModule({
  declarations: [ErrorNotFoundComponent],
  imports: [SharedModule],
  exports: [ErrorNotFoundComponent],
  providers: [ErrorGuard]
})
export class ErrorModule {}
