import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from "@whoa/web/core/ui/layout";
import { HopHomeRoutingModule } from "./hop-home-routing.module";
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, HopHomeRoutingModule, LayoutModule],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class HopHomeModule {}
