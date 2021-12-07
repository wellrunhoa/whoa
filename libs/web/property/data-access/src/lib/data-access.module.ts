import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreDataAccessModule } from "@whoa/web/core/data-access";

@NgModule({
  imports: [CommonModule, CoreDataAccessModule]
})
export class PropertyDataAccessModule {}
