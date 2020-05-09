import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../../environments/environment';
import { Initializer } from './initializer';

@Injectable({ providedIn: 'root' })
export class I18nInitializer implements Initializer {
  /* CONSTRUCTORS ========================================================== */
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _translate: TranslateService
  ) {}

  /* METHODS =============================================================== */
  async initialize(): Promise<void> {
    this._translate.addLangs(environment.i18n.languages);
    this._translate.setDefaultLang(environment.i18n.defaultLanguage);

    const browserLang = this._translate.getBrowserLang();
    this._translate.use(browserLang);

    this._translate.get('app.title').subscribe(title => {
      this._document.title = title;
    });
    this._translate.onLangChange.subscribe(event => {
      this._document.documentElement.lang = event.lang;
    });
  }
}
