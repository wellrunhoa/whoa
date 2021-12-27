import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFormComponent } from './payment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';
import { LayoutModule } from '@whoa/web/core/ui/layout';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ZorroProviderModule, LayoutModule],
  declarations: [PaymentFormComponent],
  exports: [PaymentFormComponent]
})
export class PaymentFormModule {}
