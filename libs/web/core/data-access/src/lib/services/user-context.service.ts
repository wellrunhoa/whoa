import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { App, SettingsService } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Property } from '../models/property';
import { CurrentUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  constructor(private platform: Platform, private settings: SettingsService) {}

  setUser(value: CurrentUser) {
    this.settings.setUser(value);
  }

  get user(): CurrentUser {
    return this.settings.user;
  }

  setApp(value: App) {
    this.settings.setApp(value);
  }

  get app(): App {
    return this.settings.app;
  }

  setProperty(value: Property | undefined) {
    this.setData('property', value);
  }

  get property(): Property {
    return this.getData('property');
  }

  getData(key: string): NzSafeAny {
    if (!this.platform.isBrowser) {
      return null;
    }
    return JSON.parse(sessionStorage.getItem(key) || 'null') || null;
  }

  setData(key: string, value: NzSafeAny): void {
    if (!this.platform.isBrowser) {
      return;
    }
    if (value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.removeItem(key);
    }
  }
}
