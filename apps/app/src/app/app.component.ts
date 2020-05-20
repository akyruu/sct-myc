import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NavigationError, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AppContext} from './core/contexts';
import {SocketService} from './core/services';

@Component({
  selector: 'sct-myc-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  /* FIELDS ================================================================ */
  private readonly _subscriptions: Subscription[] = [];

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    private _appContext: AppContext,
    private _socketService: SocketService
  ) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this._subscriptions.push(
      this._router.events.subscribe(event => {
        if (event instanceof NavigationError) {
          this._appContext.error = true;
        }
      }),
      this._socketService.exceptionThrowed.subscribe(error => {
        console.log('error', error); // TODO
        this._matSnackBar.open('TODO error', null, {duration: 3000});
      }),
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
