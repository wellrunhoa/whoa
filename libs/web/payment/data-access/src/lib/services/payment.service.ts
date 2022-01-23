import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, BehaviorSubject, Observable, toArray, mergeMap } from 'rxjs';
import { Payment } from '../model/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getScheduledPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`api/payments/scheduledPayments`);
    // .pipe(mergeMap(res => res),
    //   map((payment:any) => ({
    //     amount: payment['paymentAmount'],
    //     paymentDay: payment['paymentDate'],
    //     paymentType: payment['paymentSource']['paymentType'],
    //     paymentId: payment['id'],
    //     paymentSubmittedDate: payment['createdAt'],
    //   } as Payment)), toArray()
    // );
  }

  createScheduledPayment (payment: Payment): Observable<Payment>{
    console.log('calling api/payments');
    return this.http.post<Payment>('api/payments', payment);

  }

}

