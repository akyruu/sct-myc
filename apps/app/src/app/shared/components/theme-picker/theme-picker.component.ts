import { Component, OnInit } from '@angular/core';

import { Theme, ThemeService } from '../../../core';

@Component({
  selector: 'sct-myc-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss', './_theming.scss']
})
export class ThemePickerComponent implements OnInit {
  /* FIELDS ================================================================ */
  themes: Theme[] = [];
  currentTheme: Theme;

  /* CONSTRUCTOR =========================================================== */
  constructor(private _themeService: ThemeService) {}

  /* METHODS =============================================================== */
  ngOnInit(): void {
    this.themes = this._themeService.themes;
    this.currentTheme = this._themeService.currentTheme;
  }

  /* Events ---------------------------------------------------------------- */
  doChangeTheme(theme: Theme): void {
    this._themeService.use(theme);
    this.currentTheme = this._themeService.currentTheme;
  }
}
