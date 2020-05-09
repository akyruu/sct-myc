import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SocketService } from './core/services';

@Component({
  selector: 'sct-myc-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  /* FIELDS ================================================================ */
  private _subscription: Subscription;

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _matSnackBar: MatSnackBar,
    private _socketService: SocketService
  ) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this._subscription = this._socketService.exceptionThrowed.subscribe(error => {
      console.log('error', error); // TODO
      this._matSnackBar.open('TODO error');
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
