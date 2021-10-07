import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFormComponent } from './payment-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ZorroProviderModule } from "@whoa/web/shared/ui/zorro-provider";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ZorroProviderModule],
  declarations: [
    PaymentFormComponent
  ],
  exports: [
    PaymentFormComponent
  ]
})
export class PaymentFormModule {}
