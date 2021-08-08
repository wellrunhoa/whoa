import { Platform } from '@angular/cdk/platform';
import { registerLocaleData } from '@angular/common';
import ngEn from '@angular/common/locales/en';
import { Injectable } from '@angular/core';
import {
  DelonLocaleService,
  en_US as delonEnUS,
  SettingsService,
  _HttpClient,
  AlainI18nBaseService
} from '@delon/theme';
import { enUS as dfEn } from 'date-fns/locale';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { en_US as zorroEnUS, NzI18nService } from 'ng-zorro-antd/i18n';
import { Observable } from 'rxjs';

interface LangConfigData {
  abbr: string;
  text: string;
  ng: NzSafeAny;
  zorro: NzSafeAny;
  date: NzSafeAny;
  delon: NzSafeAny;
}

const DEFAULT = 'en-US';
const LANGS: { [key: string]: LangConfigData } = {
  'en-US': {
    text: 'English',
    ng: ngEn,
    zorro: zorroEnUS,
    date: dfEn,
    delon: delonEnUS,
    abbr: '🇬🇧'
  }
};

@Injectable({ providedIn: 'root' })
export class I18NService extends AlainI18nBaseService {
  protected _defaultLang = DEFAULT;
  private _langs = Object.keys(LANGS).map(code => {
    const item = LANGS[code];
    return { code, text: item.text, abbr: item.abbr };
  });

  constructor(
    private http: _HttpClient,
    private settings: SettingsService,
    private nzI18nService: NzI18nService,
    private delonLocaleService: DelonLocaleService,
    private platform: Platform
  ) {
    super();

    const defaultLang = this.getDefaultLang();
    if (this._langs.findIndex(w => w.code === defaultLang)) {
      this._defaultLang = defaultLang;
    }
  }

  private getDefaultLang(): string {
    if (!this.platform.isBrowser) {
      return DEFAULT;
    }
    if (this.settings.layout.lang) {
      return this.settings.layout.lang;
    }
    return (navigator.languages ? navigator.languages[0] : null) || navigator.language;
  }

  loadLangData(appId: string, lang: string): Observable<NzSafeAny> {
    return this.http.get(`assets/${appId}/i18n/${lang}.json`);
  }

  use(lang: string, data: Record<string, string>): void {
    if (this._currentLang === lang) return;

    this._data = data;

    const item = LANGS[lang];
    registerLocaleData(item.ng);
    this.nzI18nService.setLocale(item.zorro);
    this.nzI18nService.setDateLocale(item.date);
    this.delonLocaleService.setLocale(item.delon);
    this._currentLang = lang;

    this._change$.next(lang);
  }

  getLangs(): Array<{ code: string; text: string; abbr: string }> {
    return this._langs;
  }
}