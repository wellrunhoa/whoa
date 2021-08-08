import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from "@whoa/web/shared/ui/layout";
import { RouterModule } from '@angular/router';
import { HopShellRoutes } from "./hop-shell.routes";
import { IconsProviderModule } from "@whoa/web/shared/ui/icons-provider";
import { ZorroProviderModule } from "@whoa/web/shared/ui/zorro-provider";
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

@NgModule({
  imports: [CommonModule, 
    LayoutModule,
    IconsProviderModule,
    ZorroProviderModule,
    RouterModule.forRoot(HopShellRoutes, {
      useHash: true,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ]
})
export class HopShellModule {}
