import { Component } from '@angular/core';
import { SettingsService } from '@whoa/web/settings/data-access';

@Component({
  selector: 'whoa-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  
  constructor(public settings: SettingsService){}
}
