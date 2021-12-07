import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Community, LookupService, State } from '@whoa/web/shared/data-access';
import { HoaProperty } from '@whoa/web/property/data-access';
import { debounceTime, distinctUntilChanged, filter, Observable, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'whoa-add-property-form',
  templateUrl: './add-property-form.component.html',
  styleUrls: ['./add-property-form.component.scss']
})
export class AddPropertyFormComponent implements OnInit {
  loading = false;
  form: FormGroup;
  stateList$: Observable<State[]>;
  communities$!: Observable<Community[]>;
  @Output() submitForm = new EventEmitter<HoaProperty>();

  constructor(fb: FormBuilder, private router: Router, private lookupService: LookupService) {
    this.form = fb.group({
      communityId: [null, [Validators.required]],
      addressLine1: [null, [Validators.required]], //, Validators.pattern(/^(user)$/)
      addressLine2: [null],
      city: [null, [Validators.required]], //, Validators.pattern(/^(password)$/)
      state: [null, [Validators.required]],
      zipCode: [null, [Validators.required]]
    });

    this.stateList$ = this.lookupService.states();
  }

  ngOnInit(): void {
    const controlCommunity = this.form.get('communityId');
    if (controlCommunity)
      this.communities$ = controlCommunity.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        filter((v) => v.length > 2),
        switchMap((v: string) => {
          return this.lookupService.communities(v);
        })
      );
  }

  communityName(option: Community): string {
    return `${option.name}, ${option.city}, ${option.state}`;
  }

  submit(): void {
    this.form.markAsDirty();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    this.submitForm.emit(this.form.value as HoaProperty);
  }
}
