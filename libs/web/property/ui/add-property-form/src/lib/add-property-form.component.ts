import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Community, LookupService, State } from '@whoa/web/shared/data-access';
import { HoaProperty } from '@whoa/web/property/data-access';
import { debounceTime, distinctUntilChanged, filter, Observable, of, startWith, switchMap, tap } from 'rxjs';

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
  communities!: Community[];
  @Input() property: HoaProperty | null;

  @Output() submitForm = new EventEmitter<HoaProperty>();

  constructor(fb: FormBuilder, private router: Router, private lookupService: LookupService) {
    this.form = fb.group({
      communityId: [null, [Validators.required, this.validate.bind(this)]],
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
    if (controlCommunity) {
      this.communities$ = controlCommunity.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        filter((v) => v?.length > 2),
        switchMap((v: string) => {
          if (this.property) {
            if (v === this.property.community.id) {
              this.communities = [this.property.community];
            }
          }
          return this.lookupService.communities(v).pipe(tap((o) => (this.communities = o)));
        })
      );
    }

    setTimeout(() => {
      if (this.property) this.form.patchValue(this.property);
    }, 1);
  }

  communityName(option: Community): string {
    return `${option.name}, ${option.city}, ${option.state}`;
  }

  resetForm(): void {
    this.form.reset();
  }

  submit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value as HoaProperty);
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validationErrors: ValidationErrors = {};
    const val = control.value;

    if (val) {
      if (this.communities) {
        const selected = this.communities.map((option) => option.id).find((option) => option === val);

        if (selected == null) {
          validationErrors['autocompleteValueNotFound'] = true;
        }
      } else {
        validationErrors['required'] = true;
      }
    }

    return Object.getOwnPropertyNames(validationErrors).length > 0 ? validationErrors : null;
  }
}
