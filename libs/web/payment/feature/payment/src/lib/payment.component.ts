import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataAccessModule } from '@whoa/web/payment/data-access';
@Component({
  selector: 'whoa-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less']
})
export class PaymentComponent implements OnInit {

  constructor(private router: Router,
    private paymentDataAccessMod: DataAccessModule) { }

  ngOnInit(): void {
  }

  submit(authenticate: any) {
    this.router.navigate([`/dashboard`]);
  }

}
