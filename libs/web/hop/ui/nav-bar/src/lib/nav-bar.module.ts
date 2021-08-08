import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SettingsModule } from '@whoa/web/settings/feature';

@NgModule({
  imports: [CommonModule, NzMenuModule, NzLayoutModule, SettingsModule],
  declarations: [
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule {}
