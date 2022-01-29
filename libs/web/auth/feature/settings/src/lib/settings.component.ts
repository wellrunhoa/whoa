import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UpdatePassword, UserProfile, UserService } from '@whoa/web/auth/data-access';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'whoa-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  user$: Observable<UserProfile>;

  constructor(private service: UserService) {
    this.user$ = this.service.getUser();
  }

  updatePassword(updatePassword: UpdatePassword) {
    this.service.updatePassword(updatePassword).pipe(untilDestroyed(this)).subscribe();
  }

  updateProfile(userProfile: UserProfile) {
    this.service
      .updateUser(userProfile)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.user$ = this.service.getUser();
      });
  }
}
