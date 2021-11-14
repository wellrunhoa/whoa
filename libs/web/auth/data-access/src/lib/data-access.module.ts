import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthModuleConfig } from 'angular-oauth2-oidc';
import { AuthConfigService, CoreDataAccessModule } from '@whoa/web/core/data-access';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultOAuthInterceptor } from './services/default-oauth.interceptor';

@NgModule({
  imports: [CommonModule, CoreDataAccessModule]
})
export class AuthDataAccessModule {
  static forRoot(): ModuleWithProviders<AuthDataAccessModule> {
    return {
      ngModule: AuthDataAccessModule,
      providers: [
        {
          provide: OAuthModuleConfig,
          useFactory: (configService: AuthConfigService) => configService.resourceServerConfig,
          deps: [AuthConfigService]
        },
        { provide: HTTP_INTERCEPTORS, useClass: DefaultOAuthInterceptor, multi: true },
      ]
    };
  }
}
