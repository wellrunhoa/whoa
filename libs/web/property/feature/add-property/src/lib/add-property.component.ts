import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { Property, PropertyService } from '@whoa/web/property/data-access';
import { LookupService } from '@whoa/web/shared/data-access';

@Component({
  selector: 'whoa-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent {
  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private settings: SettingsService,
    private lookupService: LookupService
  ) {}

  addProperty(property: any) {
    this.propertyService
      .register(property)
      //.pipe()
      .subscribe((d: Property) => {
        this.settings.setData('defaultProperty', d);
        this.router.navigate(['/dashboard']);
      });
  }
}
