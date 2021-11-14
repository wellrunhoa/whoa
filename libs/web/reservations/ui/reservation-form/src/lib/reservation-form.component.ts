import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation } from '@whoa/web/reservations/data-access';
import { Amenity } from '@whoa/web/shared/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'whoa-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent {
  @Output() submitForm = new EventEmitter<Reservation>();
  reservationForm: FormGroup;
  current = 0;

  @Input()
  amenities!: Observable<Amenity[]>;

  constructor(fb: FormBuilder) {
    this.reservationForm = fb.group({
      details: fb.group({
        amenity: ['', [Validators.required]],
        reservationDate: ['', [Validators.required]],
        startTime: [null, [Validators.required]],
        endTime: [null, [Validators.required]]
      }),
      payment: fb.group({
        street: [],
        number: [],
        postal: [],
        company: []
      })
    });
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.reservationForm.get('details')?.updateValueAndValidity();

    if (this.reservationForm.get('details')?.valid) {
      this.current += 1;
    }
  }

  done(): void {
    console.log('done');
  }
}
