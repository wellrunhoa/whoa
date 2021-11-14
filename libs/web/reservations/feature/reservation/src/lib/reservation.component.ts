import { Component, OnInit } from '@angular/core';
import { Reservation } from '@whoa/web/reservations/data-access';
import { Amenity, LookupService } from '@whoa/web/shared/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'whoa-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  constructor(private lookupService: LookupService) {}

  amenities!: Observable<Amenity[]>;
  
  ngOnInit(): void {
    this.amenities = this.lookupService.communityAmenities('3a5ee6cc-9e15-4659-9cbb-bb451d3b6871');
  }

  submit(reservation: Reservation) {
    //
    console.log(reservation);
  }
}
