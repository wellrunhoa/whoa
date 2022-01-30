import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPropertyComponent } from './settings-property.component';
import { PropertyListModule } from '@whoa/web/property/ui/property-list';
import { PropertyDataAccessModule } from '@whoa/web/property/data-access';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';
import { AddPropertyFormModule } from '@whoa/web/property/ui/add-property-form';

@NgModule({
  imports: [CommonModule, PropertyListModule, PropertyDataAccessModule, ZorroProviderModule, AddPropertyFormModule],
  declarations: [SettingsPropertyComponent],
  exports: [SettingsPropertyComponent]
})
export class SettingsPropertyFeatureModule {}
