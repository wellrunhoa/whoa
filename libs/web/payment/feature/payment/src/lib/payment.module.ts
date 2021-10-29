import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import {PaymentFormModule} from '@whoa/web/payment/ui/payment-form';
import {DataAccessModule} from '@whoa/web/payment/data-access';

@NgModule({
  imports: [CommonModule, PaymentFormModule, DataAccessModule],
  declarations: [
    PaymentComponent
  ],
  exports: [
    PaymentComponent
  ]
})
export class PaymentModule {}
