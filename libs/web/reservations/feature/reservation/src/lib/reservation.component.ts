import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserContextService } from '@whoa/web/core/data-access';
import { Reservation, ReservationService } from '@whoa/web/reservations/data-access';
import { Amenity, LookupService } from '@whoa/web/shared/data-access';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'whoa-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  constructor(private lookupService: LookupService, private userContext: UserContextService, private reservationService: ReservationService) {}

  amenities!: Observable<Amenity[]>;
  reservations!: Observable<Reservation[]>;

  ngOnInit(): void {
    if (this.userContext.property?.communityId) {
      this.amenities = this.lookupService.communityAmenities(this.userContext.property.communityId);
      this.reservations = this.reservationService.getUpcoming(this.userContext.property.communityId);
    }
  }

  submit(reservation: Reservation) {
    if (!reservation.communityId) reservation.communityId = this.userContext.property?.communityId;
    this.reservationService.create(reservation).pipe(untilDestroyed(this)).subscribe();
  }
}
