import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';
import { PhoneMaskDirective } from './directives/phone-mask.directive';

@NgModule({
  imports: [CommonModule, OAuthModule],
  declarations: [PhoneMaskDirective],
  exports: [PhoneMaskDirective]
})
export class CoreDataAccessModule {}
