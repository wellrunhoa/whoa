import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '@whoa/web/settings/data-access'

@NgModule({
  imports: [CommonModule],
  providers: [SettingsService]
})
export class SettingsModule {}
