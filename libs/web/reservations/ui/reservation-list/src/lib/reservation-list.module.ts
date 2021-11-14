import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroProviderModule } from "@whoa/web/shared/ui/zorro-provider";
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { ReservationListComponent } from './reservation-list.component';

@NgModule({
  imports: [CommonModule, ZorroProviderModule, NzCalendarModule],
  declarations: [
    ReservationListComponent
  ],
  exports: [
    ReservationListComponent
  ]
})
export class ReservationListModule {}
