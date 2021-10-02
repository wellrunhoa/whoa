import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaymentComponent} from '@whoa/web/payment/feature/payment'

const routes: Routes = [
  // passport

  {
    path: '',
    component: PaymentComponent,
    data: { title: 'Payment', titleI18n: 'app.payment.payment' }
  }
  //   {
  //     path: 'register',
  //     component: UserRegisterComponent,
  //     data: { title: 'Register', titleI18n: 'app.register.register' }
  //   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {}
