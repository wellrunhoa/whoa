import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPropertyFormModule } from '@whoa/web/property/ui/add-property-form';
import { AddPropertyComponent } from './add-property.component';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';

@NgModule({
  imports: [CommonModule, AddPropertyFormModule, ZorroProviderModule],
  declarations: [AddPropertyComponent],
  exports: [AddPropertyComponent]
})
export class AddPropertyModule {}
