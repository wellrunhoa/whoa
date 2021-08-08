import { Component } from '@angular/core';
import { SettingsService } from '@whoa/web/settings/data-access';

@Component({
  selector: 'whoa-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  constructor(public settings: SettingsService) {
  }
}
