import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  imports: [CommonModule, OAuthModule]
})
export class CoreDataAccessModule {}
