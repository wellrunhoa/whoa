import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Payment, PaymentService } from '@whoa/web/payment/data-access';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Observable } from 'rxjs';

@Component({
  selector: 'whoa-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.less']
})
export class PaymentFormComponent {

  @Output() submitForm = new EventEmitter<Payment>();
  form: FormGroup;

  accountType = [
    { label: 'Checking', value: 'Checking' },
    { label: 'Savings', value: 'Savings' }
  ];

  cardType = [
    { label: 'VS', value: 'visa' },
    { label: 'MC', value: 'Mastercard' },
    { label: 'AX', value: 'American Express' },
    { label: 'DS', value: 'Discover' }
  ];

  editCache: { [key: string]: { edit: boolean; data: Payment } } = {};
  listOfData: Payment[] = [];
  //listOfData!: Observable<Payment[]>;

  constructor(fb: FormBuilder, private router: Router, private msg: NzMessageService, private message: NzModalService, private paymentService: PaymentService) {

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
      cardNumber: [null, [Validators.required]],
      cardType: [null, [Validators.required]],
      expDate: [null, [Validators.required]],
      cardCode: [null, [Validators.required]],
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
    const cardNumber = this.form.controls.cardNumber;
    const cardType = this.form.controls.cardType;
    const expDate = this.form.controls.expDate;
    const cardCode = this.form.controls.cardCode;
    
    this.form.markAsDirty();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    this.submitForm.emit(this.form.value as Payment);
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.paymentId.toString() === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.paymentId.toString() === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.paymentId.toString()] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  ngOnInit(): void {
    // const data = [];
    // for (let i = 0; i < 5; i++) {
    //   data.push({
    //     paymentId: `${i}`,
    //     paymentSubmittedDate: `Edrward ${i}`,
    //     paymentDay: '23',
    //     paymentType: `London Park no. ${i}`,
    //     routingNumber: '', 
    //     accountNumber: '',
    //     accountType: '',
    //     cardNumber: '',
    //     expDate: '',
    //     cardCode: '',
    //     cardType: '',
    //     accountHolderFirstName: '',
    //     accountHolderLastName: '',
    //     accountHolderAddress: '',
    //     accountHolderCity: '',
    //     accountHolderState: '',
    //     accountHolderZip: '',
    //     amount: ''
    //   });
    // }
    this.paymentService.getScheduledPayments('').subscribe(listOfData => this.listOfData = listOfData);;
    this.updateEditCache();
  }
  
}
