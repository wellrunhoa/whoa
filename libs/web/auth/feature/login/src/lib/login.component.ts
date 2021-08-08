/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { AuthService } from '@whoa/web/auth/data-access';

@Component({
  selector: 'whoa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private settingService: SettingsService
  ) {}

  submit(authenticate: any) {
    this.authService.login(authenticate).subscribe(user => {
      this.settingService.setUser(user);
    });
    
    this.router.navigate([`/dashboard`]);
  }
}
