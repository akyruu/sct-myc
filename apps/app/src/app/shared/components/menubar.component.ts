import { Component, ContentChild, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppContext } from '../../core';
import { Icon } from '../models';

@Component({
  selector: 'sct-myc-menubar',
  templateUrl: './menubar.component.html'
})
export class MenubarComponent implements OnInit, OnDestroy {
  /* FIELDS ================================================================ */
  @Input() icon: Icon = { svg: 'pickaxe' };
  @Input() title: string;
  @Input() sticky = true;

  @ContentChild('icon') iconRef: TemplateRef<any>;
  @ContentChild('title') titleRef: TemplateRef<any>;
  @ContentChild('actions') actionsRef: TemplateRef<any>;

  appLoading = false;
  navLoading = false;

  private readonly _subscriptions: Subscription[] = [];

  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _router: Router,
    private _appContext: AppContext
  ) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this._subscriptions.push(
      this._router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.navLoading = true;
        } else if (event instanceof NavigationCancel
          || event instanceof NavigationEnd
          || event instanceof NavigationError) {
          this.navLoading = false;
        }
      }),
      this._appContext.loading.subscribe(loading => this.appLoading = loading)
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
