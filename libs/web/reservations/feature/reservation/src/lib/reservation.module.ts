import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataAccessModule } from '@whoa/web/shared/data-access';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';
import { ReservationFormModule } from '@whoa/web/reservations/ui/reservation-form';
import { ReservationListModule } from '@whoa/web/reservations/ui/reservation-list';
import { ReservationComponent } from './reservation.component';

@NgModule({
  imports: [CommonModule, ZorroProviderModule, ReservationFormModule, ReservationListModule, SharedDataAccessModule],
  declarations: [ReservationComponent],
  exports: [ReservationComponent]
})
export class ReservationModule {}
