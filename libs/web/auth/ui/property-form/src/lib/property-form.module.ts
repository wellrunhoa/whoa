import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyFormComponent } from './property-form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PropertyFormComponent],
  exports: [PropertyFormComponent]
})
export class AuthPropertyFormModule {}
