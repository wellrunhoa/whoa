import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceReqService, ServiceRequest} from '@whoa/web/service-req/data-access'
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'whoa-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.less']
})
export class ServiceRequestComponent {

  constructor(
    private router: Router,
    private serviceReqService: ServiceReqService,
  ) {}

  serviceReq!: Observable<ServiceRequest>;
  afterSaveEvent: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    setTimeout(() => this.afterSaveEvent.next(), 1);
  }

  submit(serviceReq: ServiceRequest) {
    // this.serviceReqService.(authenticate).subscribe(user => {
    //   this.settingService.setUser(user);
    // });
    this.serviceReqService.createServcRequest(serviceReq).subscribe(()=>this.afterSaveEvent.next());;
    //this.router.navigate([`/dashboard`]);
  }

  cancelServiceReq(){
    
  }
}
