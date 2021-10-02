import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentModule} from '@whoa/web/payment/feature/payment'
import {PaymentRoutingModule} from './payment-routing.module'

@NgModule({
  imports: [CommonModule, PaymentModule, PaymentRoutingModule]
})
export class PaymentShellModule {}
