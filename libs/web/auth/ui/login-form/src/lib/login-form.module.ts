import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { ZorroProviderModule } from "@whoa/web/shared/ui/zorro-provider";
import { LoginFormComponent } from './login-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ZorroProviderModule],
  declarations: [
    LoginFormComponent
  ],
  exports: [
    LoginFormComponent
  ]
})
export class LoginFormModule {}
