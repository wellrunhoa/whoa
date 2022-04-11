import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from '@whoa/web/reservations/data-access';

@Component({
  selector: 'whoa-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent {
  @Input()
  reservations: Reservation[] | null = [];
}
