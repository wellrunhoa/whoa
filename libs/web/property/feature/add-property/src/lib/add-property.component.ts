import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { HoaProperty, PropertyService } from '@whoa/web/property/data-access';

@Component({
  selector: 'whoa-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent {
  constructor(private router: Router, private propertyService: PropertyService, private settings: SettingsService) {}

  addProperty(property: any) {
    this.propertyService
      .register(property)
      //.pipe()
      .subscribe((d: HoaProperty) => {
        this.settings.setData('defaultProperty', d);
        this.router.navigate(['/dashboard']);
      });
  }
}
