import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'sct-myc-error-not-found',
  templateUrl: './error-not-found.component.html'
})
export class ErrorNotFoundComponent {
  /* CONSTRUCTOR =========================================================== */
  constructor(
    private _location: Location,
    private _router: Router
  ) {}

  /* METHODS =============================================================== */
  doBack(): void {
    this._location.back();
  }

  doHome(): void {
    this._router.navigate(['/welcome']).then();
  }
}
