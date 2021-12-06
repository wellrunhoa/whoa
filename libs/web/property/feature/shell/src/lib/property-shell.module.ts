import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPropertyModule } from "@whoa/web/property/feature/add-property";
import { PropertyRoutingModule } from "./property-routing.module";

@NgModule({
  imports: [CommonModule, AddPropertyModule, PropertyRoutingModule]
})
export class PropertyShellModule {}
