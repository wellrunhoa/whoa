import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import { IconsProviderModule } from '@whoa/web/shared/ui/icons-provider'
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SettingsModule } from "@whoa/web/settings/feature";

@NgModule({
  imports: [CommonModule, NzLayoutModule, IconsProviderModule, SettingsModule],
  declarations: [
    TopBarComponent
  ],
  exports: [
    TopBarComponent
  ]
})
export class TopBarModule {
}
