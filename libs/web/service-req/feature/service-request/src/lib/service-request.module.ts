import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRequestComponent } from './service-request.component';
import { ServiceRequestFormModule} from "@whoa/web/service-req/ui/service-request-form";
import { DataAccessModule} from '@whoa/web/service-req/data-access'

@NgModule({
  imports: [CommonModule, ServiceRequestFormModule, DataAccessModule],
  declarations: [
    ServiceRequestComponent
  ],
  exports: [
    ServiceRequestComponent
  ]
})
export class ServiceRequestModule {}
