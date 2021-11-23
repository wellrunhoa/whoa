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

  ngOnInit(): void {
    this.payments = this.paymentService.getScheduledPayments('3a5ee6cc-9e15-4659-9cbb-bb451d3b6871');
  }

  submit(authenticate: any) {
    this.router.navigate([`/dashboard`]);
  }

}
