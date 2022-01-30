import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HoaProperty, PropertyService } from '@whoa/web/property/data-access';

@UntilDestroy()
@Component({
  selector: 'whoa-settings-property',
  templateUrl: './settings-property.component.html',
  styleUrls: ['./settings-property.component.scss']
})
export class SettingsPropertyComponent {
  properties: Array<HoaProperty | null> = [];
  visible = false;
  title = 'Add Property';
  property: HoaProperty | null;

  constructor(private propertyService: PropertyService) {
    this.propertyService
      .getProperties()
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.properties = this.properties.concat(res);
        this.properties.push(null);
      });
  }

  addProperty() {
    this.title = 'Add Property';
    this.property = null;
    this.open();
  }

  editProperty(property: HoaProperty) {
    this.title = 'Update Property';
    this.property = property;
    this.open();
  }

  saveProperty(property: HoaProperty) {
    //
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;

    this.property = null;
  }
}
