import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../model/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  create(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>('api/amenities/reservation', reservation);
  }

  getUpcoming(communityId: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`api/amenities/reservations/upcoming/${communityId}`);
  }
}
