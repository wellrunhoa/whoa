import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { AlainThemeModule } from '@delon/theme';
import { LayoutDefaultModule } from '@delon/theme/layout-default';
import { GlobalFooterModule } from '@delon/abc/global-footer';
import { IconsProviderModule } from '@whoa/web/shared/ui/icons-provider';
import { SettingsModule } from '@whoa/web/settings/feature';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { ZorroProviderModule }  from '@whoa/web/shared/ui/zorro-provider';
import { HeaderUserComponent }  from './basic-layout/widgets/header-user.component';

@NgModule({
  imports: [
    CommonModule,
    NzLayoutModule,
    RouterModule,
    SettingsModule,
    NzBackTopModule,
    NzI18nModule,
    ZorroProviderModule,
    AlainThemeModule.forChild(),
    LayoutDefaultModule,
    GlobalFooterModule,
    IconsProviderModule
  ],
  declarations: [BasicLayoutComponent, AuthLayoutComponent, HeaderUserComponent],
  exports: [BasicLayoutComponent, AuthLayoutComponent, HeaderUserComponent]
})
export class LayoutModule {}
