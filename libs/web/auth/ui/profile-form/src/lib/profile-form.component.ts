import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserProfile } from '@whoa/web/auth/data-access';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'whoa-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  @Input() user$!: Observable<UserProfile>;

  loading = false;

  @Output() submitForm = new EventEmitter<UserProfile>();

  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      homePhone: [null],
      mobilePhone: [null, [Validators.required, Validators.minLength(14)]],
      workPhone: [null]
    });
  }

  ngOnInit(): void {
    this.user$.pipe(untilDestroyed(this)).subscribe((user) => this.form.patchValue(user));
  }

  submit(): void {
    const userProfile = this.form.value as UserProfile;
    if (this.form.valid) {
      this.submitForm.emit(userProfile);
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
