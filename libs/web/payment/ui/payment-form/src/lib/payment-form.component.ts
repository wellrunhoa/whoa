import { Component, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataAccessModule } from '@whoa/web/payment/data-access';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'whoa-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.less']
})
export class PaymentFormComponent {

  @Output() submitForm = new EventEmitter<DataAccessModule>();
  form: FormGroup;

  accountType = [
    { label: 'Checking', value: 'Checking' },
    { label: 'Savings', value: 'Savings' }
  ];

  constructor(fb: FormBuilder, private router: Router, private msg: NzMessageService, private message: NzModalService) {

    this.form = fb.group({
      amount: [null, [Validators.required]], //, Validators.pattern(/^(user)$/)
      routingNumber: [null, [Validators.required]], //, Validators.pattern(/^(password)$/)
      accountNumber: [null, [Validators.required]],
      accountType: [null, [Validators.required]],
      accountHolderFirstName: [null, [Validators.required]],
      accountHolderLastName: [null, [Validators.required]],
      accountHolderAddress: [null, [Validators.required]],
      accountHolderCity: [null, [Validators.required]],
      accountHolderState: [null, [Validators.required]],
      accountHolderZip: [null, [Validators.required]],
      remember: [true]
    });

   }

   submitPayment(): void {
    const propamountStreetAddress = this.form.controls.amount;
    const routingNumber = this.form.controls.routingNumber;
    const accountNumber = this.form.controls.accountNumber;
    const accountType = this.form.controls.accountType;
    const accountHolderFirstName = this.form.controls.accountHolderFirstName;
    const accountHolderLastName = this.form.controls.accountHolderLastName;
    const accountHolderAddress = this.form.controls.accountHolderAddress;
    const accountHolderCity = this.form.controls.accountHolderCity;
    const accountHolderState = this.form.controls.accountHolderState;
    const accountHolderZip = this.form.controls.accountHolderZip;


    this.form.markAsDirty();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    this.submitForm.emit(this.form.value as DataAccessModule);
  }

  

}
