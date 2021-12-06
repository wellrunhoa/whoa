import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPropertyFormModule } from "@whoa/web/property/ui/add-property-form";
import { AddPropertyComponent } from './add-property.component';

@NgModule({
  imports: [CommonModule, AddPropertyFormModule],
  declarations: [
    AddPropertyComponent
  ],
  exports: [
    AddPropertyComponent
  ]
})
export class AddPropertyModule {}
