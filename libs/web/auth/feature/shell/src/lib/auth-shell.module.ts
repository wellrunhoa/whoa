import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@whoa/web/core/ui/layout';
import { LoginModule } from '@whoa/web/auth/feature/login';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthDataAccessModule } from '@whoa/web/auth/data-access';
import { CoreDataAccessModule } from '@whoa/web/core/data-access';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  imports: [
    CoreDataAccessModule,
    AuthDataAccessModule.forRoot(),
    OAuthModule.forRoot(),
    CommonModule,
    LayoutModule,
    LoginModule,
    AuthRoutingModule
  ],
  providers: []
})
export class AuthShellModule {}
