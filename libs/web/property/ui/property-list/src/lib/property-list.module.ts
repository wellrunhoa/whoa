import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyListComponent } from './property-list.component';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';

@NgModule({
  imports: [CommonModule, ZorroProviderModule],
  declarations: [PropertyListComponent],
  exports: [PropertyListComponent]
})
export class PropertyListModule {}
