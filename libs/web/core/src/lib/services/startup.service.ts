import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconService } from 'ng-zorro-antd/icon';
import { Observable, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { I18NService } from './i18n.service';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {

  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    //private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient
  ) {
    //iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  load(appId: string): Observable<void> {
    const defaultLang = this.i18n.defaultLang;
    return zip(this.i18n.loadLangData(appId, defaultLang), this.httpClient.get(`assets/${appId}/app-data.json`)).pipe(
      catchError(res => {
        console.warn(`StartupService.load: Network request failed`, res);
        return [];
      }),
      map(([langData, appData]: [Record<string, string>, NzSafeAny]) => {
        // setting language data
        this.i18n.use(defaultLang, langData);

        this.settingService.setApp(appData.app);

        //this.settingService.setUser(appData.user);

        //this.aclService.setFull(true);

        this.menuService.add(appData.menu);

        this.titleService.default = '';
        this.titleService.suffix = appData.app.name;
      })
    );
  }
}
