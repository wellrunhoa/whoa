import { Injectable } from '@angular/core';
import { ServiceRequest} from '../model/service-request';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceReqService {

  constructor(private httpClient: HttpClient) {}
  servcRequest(serviceReq : ServiceRequest) {

  }
}
