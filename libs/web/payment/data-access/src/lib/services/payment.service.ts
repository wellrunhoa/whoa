import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, BehaviorSubject, Observable } from 'rxjs';
import {Payment} from '../model/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {}
  setupPayment(payment : Payment) {

  }

  getScheduledPayments(proprietorId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`api/payments/scheduledPayments/${proprietorId}`).pipe(map(res => res));
  }
}

