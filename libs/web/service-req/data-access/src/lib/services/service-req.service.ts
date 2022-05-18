import { Injectable } from '@angular/core';
import { ServiceRequest} from '../model/service-request';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserContextService } from '@whoa/web/core/data-access';
import { ServiceRequestDoc } from '../model/service-request-doc';


@Injectable({
  providedIn: 'root'
})
export class ServiceReqService {

  constructor(private http: HttpClient, private userContext: UserContextService) {}

  createServcRequest(serviceReq : ServiceRequest): Observable<ServiceRequest> {
    const propertyId = this.userContext.property.id;
    console.log('serviceReq in UI service layer', serviceReq);
    return this.http.post<ServiceRequest>(`api/service-request/${propertyId}`, serviceReq);
  }

  getAllServiceReq (): Observable<ServiceRequest[]>{
    const propertyId = this.userContext.property.id;
    return this.http.get<ServiceRequest[]>(`api/service-request/list/${propertyId}`);
  }

  uploadDocs(docList: FormData): Observable<ServiceRequestDoc[]>{
    return this.http.post<ServiceRequestDoc[]>(`api/documents/uploads`, docList);
  }
}
