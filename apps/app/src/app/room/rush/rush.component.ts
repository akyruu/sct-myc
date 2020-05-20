import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RushContext} from './core';

@Component({
  selector: 'sct-myc-rush',
  templateUrl: './rush.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RushComponent implements OnInit, OnDestroy {
  /* FIELDS ================================================================ */
  title: string;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  private readonly _subscriptions: Subscription[] = [];

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _rushContext: RushContext
  ) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this.title = this._rushContext.title.value;
    this._subscriptions.push(
      this._rushContext.title.subscribe(title => {
        this.title = title;
        this._changeDetectorRef.detectChanges();
      }),
      this._router.events.subscribe(event => {
        if (this.sidenav.opened && this.sidenav.mode !== 'side') {
          this.sidenav.close().then();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
