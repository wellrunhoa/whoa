import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment, PaymentService } from '@whoa/web/payment/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'whoa-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less']
})
export class PaymentComponent implements OnInit {

  constructor(private router: Router,
    private paymentService: PaymentService) { }

    payments!: Observable<Payment[]>;
    payment!: Observable<Payment>;

  ngOnInit(): void {
    this.payments = this.paymentService.getScheduledPayments('6e504840-6a9b-4bf9-9343-5b891a5212df');
  }

  submit(payment: Payment) {
    console.log('payment obj', payment);
    this.payment = this.paymentService.createScheduledPayment(payment);
    this.payments = this.paymentService.getScheduledPayments('6e504840-6a9b-4bf9-9343-5b891a5212df');
    //this.router.navigate([`/dashboard`]);
  }

}
