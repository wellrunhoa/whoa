import { Component } from '@angular/core';
import { UserProfile, UserService } from '@whoa/web/auth/data-access';
import { Observable } from 'rxjs';

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
}
