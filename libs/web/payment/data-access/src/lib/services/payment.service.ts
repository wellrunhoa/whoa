import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {Payment} from '../model/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) {}
  setupPayment(payment : Payment) {

  }

  getScheduledPayments(payment : Payment) {

  }
}

