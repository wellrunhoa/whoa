import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';
import { LayoutModule } from '@whoa/web/core/ui/layout';
import { ProfileFormComponent } from './profile-form.component';

@NgModule({
  imports: [CommonModule, ZorroProviderModule, LayoutModule, ReactiveFormsModule],
  declarations: [ProfileFormComponent],
  exports: [ProfileFormComponent]
})
export class AuthProfileFormModule {}
