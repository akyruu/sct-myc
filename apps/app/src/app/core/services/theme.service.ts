import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ObjectLocalStorageItem } from '../models/local-storage-item';

export interface Theme {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  /* FIELDS ================================================================ */
  public readonly themes: Theme[] = Object.entries(environment.assets.themes.values)
    .map(entry => <Theme>{ id: entry[0], name: entry[1] });
  private readonly _themeFolder = environment.assets.folder + '/' + environment.assets.themes.folder;

  private _defaultTheme = this.themes[0];
  private readonly _currentTheme = new ObjectLocalStorageItem<Theme>('theme');

  /* CONSTRUCTOR =========================================================== */
  constructor(@Inject(DOCUMENT) private  _document: Document) {
    this.use(this._currentTheme.value, true);
  }

  /* METHODS =============================================================== */
  get currentTheme(): Theme {
    return this._currentTheme.value;
  }

  use(theme: Theme, force = false): void {
    if (!theme || !this.themes.find(t => t.id === theme.id)) {
      theme = this._defaultTheme;
    }
    if (theme !== this._currentTheme.value || force) {
      this._apply(theme);
      this._currentTheme.value = theme;
    }
  }

  private _apply(theme: Theme): void {
    const link = <HTMLLinkElement>this._document.getElementById('theme_asset');
    link.href = this._themeFolder + '/' + theme.id + '.css';
  }
}
