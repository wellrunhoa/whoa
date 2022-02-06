import { Injectable } from '@angular/core';
import { ServiceRequest} from '../model/service-request';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceReqService {

  constructor(private http: HttpClient) {}

  createServcRequest(serviceReq : ServiceRequest): Observable<ServiceRequest> {
    return this.http.post<ServiceRequest>('api/service-request', serviceReq);
  }

  getAllServiceReq (): Observable<ServiceRequest[]>{
    return this.http.get<ServiceRequest[]>('api/service-request');
  }
}
