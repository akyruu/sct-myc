import {Component, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Room} from '@sct-myc/api-interfaces';

import {AppContext} from '../../../../core';

@Component({
  selector: 'sct-myc-rush-sidenav',
  templateUrl: './rush-sidenav.component.html'
})
export class RushSidenavComponent implements OnInit {
  /* FIELDS ================================================================ */
  room: Room;

  /* CONSTRUCTOR =========================================================== */
  constructor(
    public sidenav: MatSidenav,
    private _appContext: AppContext
  ) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this.room = this._appContext.room;
  }
}
