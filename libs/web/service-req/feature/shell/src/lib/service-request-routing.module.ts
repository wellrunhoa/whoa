import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServiceRequestComponent} from '@whoa/web/service-req/feature/service-request'

const routes: Routes = [
  // passport

  {
    path: '',
    component: ServiceRequestComponent,
    data: { title: 'Service Request', titleI18n: 'app.service-request.service-request' }
  }
  //   {
  //     path: 'register',
  //     component: UserRegisterComponent,
  //     data: { title: 'Register', titleI18n: 'app.register.register' }
  //   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRequestRoutingModule {}
