import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataAccessModule } from '@whoa/web/shared/data-access';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';
import { LayoutModule } from '@whoa/web/core/ui/layout';
import { ReservationFormModule } from '@whoa/web/reservations/ui/reservation-form';
import { ReservationListModule } from '@whoa/web/reservations/ui/reservation-list';
import { ReservationComponent } from './reservation.component';
import { ReservationsDataAccessModule } from '@whoa/web/reservations/data-access';

@NgModule({
  imports: [
    CommonModule,
    ZorroProviderModule,
    ReservationFormModule,
    ReservationListModule,
    SharedDataAccessModule,
    LayoutModule,
    ReservationsDataAccessModule
  ],
  declarations: [ReservationComponent],
  exports: [ReservationComponent]
})
export class ReservationModule {}
