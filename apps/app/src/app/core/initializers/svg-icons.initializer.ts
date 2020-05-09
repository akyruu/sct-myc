import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';
import { Initializer } from './initializer';

@Injectable({ providedIn: 'root' })
export class SvgIconsInitializer implements Initializer {
  /* CONSTRUCTORS ========================================================== */
  constructor(
    private _domSanitazer: DomSanitizer,
    private _matIconRegistry: MatIconRegistry
  ) {}

  /* METHODS =============================================================== */
  async initialize(): Promise<void> {
    const assets = environment.assets;
    const folder = assets.folder + '/' + assets.icons.folder;
    assets.icons.svg.forEach(icon =>
      this._matIconRegistry.addSvgIcon(icon, this._domSanitazer.bypassSecurityTrustResourceUrl(folder + '/' + icon + '.svg')));
  }
}
