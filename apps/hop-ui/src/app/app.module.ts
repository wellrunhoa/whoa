import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, LOCALE_ID, NgModule, Type } from '@angular/core';
import { AppComponent } from './app.component';
import { DELON_LOCALE, en_US as delonLang, ALAIN_I18N_TOKEN, en_US } from '@delon/theme';
import { NZ_DATE_LOCALE, NZ_I18N, en_US as zorroLang } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { AppRoutingModule } from './app-routing.module'
//import { FormsModule } from '@angular/forms'
import { IconsProviderModule } from '@whoa/web/shared/ui/icons-provider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HopShellModule } from '@whoa/web/hop/feature/hop-shell';
import { I18NService, setAppInjector, StartupService } from '@whoa/web/core/data-access';
import { Observable } from 'rxjs';

registerLocaleData(en);

// #region i18n services
const I18NSERVICE_PROVIDES = [{ provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false }];
// #endregion

// #region global third module
import { BidiModule } from '@angular/cdk/bidi';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GLOBAL_THIRD_MODULES: Array<Type<any>> = [BidiModule];

// #region Startup Service
export function StartupServiceFactory(startupService: StartupService): () => Observable<void> {
  return () => startupService.load('hop');
}
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  }
];
// #endregion

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NzLayoutModule,
    NzMenuModule,
    HopShellModule,
    IconsProviderModule,
    //AppRoutingModule,
    ...GLOBAL_THIRD_MODULES
  ],
  providers: [
    { provide: NZ_I18N, useValue: zorroLang },
    { provide: NZ_DATE_LOCALE, useValue: zorroLang }, //??
    { provide: DELON_LOCALE, useValue: delonLang },
    ...I18NSERVICE_PROVIDES,
    ...APPINIT_PROVIDES
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    setAppInjector(injector);
  }
}
