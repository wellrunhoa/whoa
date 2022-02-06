import { AfterContentInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Payment, PaymentService } from '@whoa/web/payment/data-access';
import { Observable, Subject } from 'rxjs';

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
    afterSaveEvent: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    // this.afterSaveEvent.next();
    setTimeout(() => this.afterSaveEvent.next(), 1);
   // this.payments = this.paymentService.getScheduledPayments('6e504840-6a9b-4bf9-9343-5b891a5212df');
  }

  submit(payment: Payment) {
    console.log('payment obj', payment);
    this.paymentService.createScheduledPayment(payment).subscribe(()=>this.afterSaveEvent.next());
    console.log('after createScheduledPayment', payment);
    //this.payments = this.paymentService.getScheduledPayments('6e504840-6a9b-4bf9-9343-5b891a5212df');
    //this.router.navigate([`/dashboard`]);
  }

}
