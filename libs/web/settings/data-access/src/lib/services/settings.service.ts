/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Layout } from './types';

@Injectable()
export class SettingsService<L extends Layout = Layout> {
  private _layout: L | null = null;

  get layout(): L {
    if (!this._layout) {
      this._layout = <L>{
        fixed: true,
        collapsed: false,
        lang: "en"
      };
    }
    return this._layout as L;
  }
  
  setLayout(nm: string | L, value?: any): boolean {
    if (typeof nm === 'string') {
      (this._layout as Layout)[nm] = value;
    } else {
      this._layout = nm;
    }
    return true;
  }
}