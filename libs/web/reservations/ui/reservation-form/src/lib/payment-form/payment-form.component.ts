import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Amenity } from '@whoa/web/reservations/data-access';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'whoa-reservation-payment-form',
  templateUrl: './payment-form.component.html'
})
export class PaymentFormComponent {
  @Input() formGroupName = "payment";

  detailForm: FormGroup;
  dateFormat = 'MM/dd/yyyy';
  time = new Date();

  amenities$: Observable<Array<Amenity>>;

  constructor(private rootFormGroup: FormGroupDirective) {
    const amenities = new Array<Amenity>();
    amenities.push({ id: 'A1', label: 'Swimming Pool' });
    amenities.push({ id: 'A2', label: 'Tennies Court' });
    amenities.push({ id: 'A3', label: 'Volleyball' });

    this.amenities$ = of(amenities);
    this.detailForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }
}
