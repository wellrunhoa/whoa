import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { AddPropertyFormComponent } from './add-property-form.component';
import { ZorroProviderModule } from "@whoa/web/shared/ui/zorro-provider";
import { SharedDataAccessModule } from "@whoa/web/shared/data-access";

@NgModule({
  imports: [CommonModule, NzAutocompleteModule, ReactiveFormsModule, ZorroProviderModule, SharedDataAccessModule],
  declarations: [AddPropertyFormComponent],
  exports: [AddPropertyFormComponent]
})
export class AddPropertyFormModule {}
