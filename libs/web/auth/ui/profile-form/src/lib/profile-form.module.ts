import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';
import { LayoutModule } from '@whoa/web/core/ui/layout';
import { ProfileFormComponent } from './profile-form.component';
import { CoreDataAccessModule } from '@whoa/web/core/data-access';

@NgModule({
  imports: [CommonModule, ZorroProviderModule, LayoutModule, ReactiveFormsModule, CoreDataAccessModule],
  declarations: [ProfileFormComponent],
  exports: [ProfileFormComponent]
})
export class AuthProfileFormModule {}
