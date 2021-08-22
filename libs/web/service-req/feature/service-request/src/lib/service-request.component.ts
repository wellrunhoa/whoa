import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceReqService} from '@whoa/web/service-req/data-access'

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

  // ngOnInit(): void {
  // }

  submit(authenticate: any) {
    // this.serviceReqService.(authenticate).subscribe(user => {
    //   this.settingService.setUser(user);
    // });
    
    this.router.navigate([`/dashboard`]);
  }
}
