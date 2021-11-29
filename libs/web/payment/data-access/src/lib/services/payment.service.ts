import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, BehaviorSubject, Observable, toArray, mergeMap } from 'rxjs';
import { Payment } from '../model/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  setupPayment(payment: Payment) {

  }

  getScheduledPayments(proprietorId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`api/payments/payments/${proprietorId}`).pipe(mergeMap(res => res),
      map((payment:any) => ({
        amount: payment['paymentAmount'],
        paymentDay: payment['paymentDate'],
        paymentType: payment['paymentSource']['paymentType'],
        paymentId: payment['id'],
        paymentSubmittedDate: payment['createdAt'],
      } as Payment)), toArray()
    );
  }
}

