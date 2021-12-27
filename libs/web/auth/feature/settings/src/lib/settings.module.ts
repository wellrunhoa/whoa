import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';
import { LayoutModule } from '@whoa/web/core/ui/layout';
import { SettingsComponent } from './settings.component';
import { AuthProfileFormModule } from '@whoa/web/auth/ui/profile-form';
import { AuthPropertyFormModule } from '@whoa/web/auth/ui/property-form';
import { AuthPasswordFormModule } from '@whoa/web/auth/ui/password-form';

@NgModule({
  imports: [
    CommonModule,
    NzTabsModule,
    LayoutModule,
    ZorroProviderModule,
    ReactiveFormsModule,
    AuthProfileFormModule,
    AuthPasswordFormModule,
    AuthPropertyFormModule,
    AuthPasswordFormModule
  ],
  declarations: [SettingsComponent],
  exports: [SettingsComponent]
})
export class AuthSettingsModule {}
