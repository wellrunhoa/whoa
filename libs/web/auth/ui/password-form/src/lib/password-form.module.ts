import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';
import { LayoutModule } from '@whoa/web/core/ui/layout';
import { PasswordFormComponent } from './password-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ZorroProviderModule, LayoutModule],
  declarations: [PasswordFormComponent],
  exports: [PasswordFormComponent]
})
export class AuthPasswordFormModule {}
