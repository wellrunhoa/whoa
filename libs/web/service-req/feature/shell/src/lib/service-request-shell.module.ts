import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServiceRequestModule} from '@whoa/web/service-req/feature/service-request'
import {ServiceRequestRoutingModule} from './service-request-routing.module'

@NgModule({
  imports: [CommonModule, ServiceRequestModule, ServiceRequestRoutingModule]
})
export class ServiceRequestShellModule {}
