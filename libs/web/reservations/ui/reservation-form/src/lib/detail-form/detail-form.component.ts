import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Amenity } from '@whoa/web/shared/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'whoa-reservation-detail-form',
  templateUrl: './detail-form.component.html'
})
export class DetailFormComponent {
  @Input() formGroupName = "details";
  @Input() amenities!: Observable<Amenity[]>;

  detailForm: FormGroup;
  dateFormat = 'MM/dd/yyyy';
  time = new Date();


  constructor(private rootFormGroup: FormGroupDirective) {
    // const amenities = new Array<Amenity>();
    // amenities.push({ id: 'A1', label: 'Swimming Pool' });
    // amenities.push({ id: 'A2', label: 'Tennies Court' });
    // amenities.push({ id: 'A3', label: 'Volleyball' });

    this.detailForm = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }
}
