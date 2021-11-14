import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationModule } from "@whoa/web/reservations/feature/reservation";
import { ReservationsRoutingModule } from "./reservations-routing.module";

@NgModule({
  imports: [CommonModule, ReservationModule, ReservationsRoutingModule]
})
export class ReservationsShellModule {}
