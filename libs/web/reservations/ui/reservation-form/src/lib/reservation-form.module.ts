import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';
import { SharedDataAccessModule } from '@whoa/web/shared/data-access';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { ReservationFormComponent } from './reservation-form.component';
import { DetailFormComponent } from './detail-form/detail-form.component';
import { ReservationsDataAccessModule } from '@whoa/web/reservations/data-access';
import { CoreDataAccessModule } from '@whoa/web/core/data-access';
import { PaymentFormComponent } from './payment-form/payment-form.component';

@NgModule({
  imports: [
    CommonModule,
    ZorroProviderModule,
    NzTimePickerModule,
    ReservationsDataAccessModule,
    CoreDataAccessModule,
    SharedDataAccessModule
  ],
  declarations: [ReservationFormComponent, DetailFormComponent, PaymentFormComponent],
  exports: [ReservationFormComponent, DetailFormComponent, PaymentFormComponent]
})
export class ReservationFormModule {}
