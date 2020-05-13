import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslateModule} from '@ngx-translate/core';

import {MenubarComponent} from './menubar/menubar.component';
import {ThemePickerComponent} from './theme-picker/theme-picker.component';
import {TranslateComponent} from './translate/translate.component';

const Components = [
  MenubarComponent,
  TranslateComponent,
  ThemePickerComponent
];

@NgModule({
  declarations: [Components],
  imports: [
    CommonModule,
    TranslateModule,
    // Cdk
    DragDropModule,
    // Material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressBarModule
  ],
  exports: [Components]
})
export class SharedComponentsModule {}
