import { Component, Input, OnInit } from '@angular/core';
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

  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      homePhone: [null, [Validators.required]],
      mobilePhone: [null, [Validators.required]],
      workPhone: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.user$.pipe(untilDestroyed(this)).subscribe((user) => this.form.patchValue(user));
  }
}
