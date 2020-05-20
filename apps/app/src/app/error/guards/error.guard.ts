import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AppContext} from '../../core/contexts';

@Injectable()
export class ErrorGuard implements CanActivate {
  /* CONSTRUCTOR =========================================================== */
  constructor(private _appContext: AppContext) {}

  /* METHODS =============================================================== */
  canActivate(): boolean {
    this._appContext.error = false;
    return true;
  }
}
