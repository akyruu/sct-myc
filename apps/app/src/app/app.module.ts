import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateParser } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SocketIoModule } from 'ngx-socket-io';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { I18nInitializer, InitializerFactory, SvgIconsInitializer, TranslateParser as AppTranslateParser } from './core';
import { RoomModule } from './room/room.module';
import { WelcomeModule } from './welcome';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function TranslateParserFactory() {
  return new AppTranslateParser();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(environment.socket.config),
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: TranslateHttpLoaderFactory, deps: [HttpClient] },
      parser: { provide: TranslateParser, useFactory: TranslateParserFactory }
    }),
    // Application
    AppRoutingModule,
    RoomModule,
    WelcomeModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: InitializerFactory, deps: [I18nInitializer], multi: true },
    { provide: APP_INITIALIZER, useFactory: InitializerFactory, deps: [SvgIconsInitializer], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
