import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from "@whoa/web/reservations/feature/reservation";

const routes: Routes = [  {
    path: '',
    component: ReservationComponent,
    data: { title: 'Reservations', titleI18n: 'app.resrvations.reservation' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule {}
