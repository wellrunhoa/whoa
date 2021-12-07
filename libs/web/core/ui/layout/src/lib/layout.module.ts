import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AlainThemeModule } from '@delon/theme';
import { LayoutDefaultModule } from '@delon/theme/layout-default';
import { GlobalFooterModule } from '@delon/abc/global-footer';

import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';

import { CoreDataAccessModule } from '@whoa/web/core/data-access';
import { IconsProviderModule } from '@whoa/web/shared/ui/icons-provider';
import { SettingsModule } from '@whoa/web/settings/feature';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';

import { HeaderUserComponent } from './basic-layout/widgets/header-user.component';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { PortletComponent } from './portlet/portlet.component';

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
    IconsProviderModule,
    CoreDataAccessModule
  ],
  declarations: [BasicLayoutComponent, AuthLayoutComponent, HeaderUserComponent, PortletComponent],
  exports: [BasicLayoutComponent, AuthLayoutComponent, HeaderUserComponent, PortletComponent]
})
export class LayoutModule {}
