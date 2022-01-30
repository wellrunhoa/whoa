import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@whoa/web/core/ui/layout';
import { RouterModule } from '@angular/router';
import { HopShellRoutes } from './hop-shell.routes';
import { IconsProviderModule } from '@whoa/web/shared/ui/icons-provider';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { AuthShellModule } from '@whoa/web/auth/feature/shell';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    IconsProviderModule,
    ZorroProviderModule,
    AuthShellModule,
    RouterModule.forRoot(HopShellRoutes, {
      useHash: true,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
      paramsInheritanceStrategy: 'always', //To get the lazy modules routing params
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule],
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})
export class HopShellModule {}
