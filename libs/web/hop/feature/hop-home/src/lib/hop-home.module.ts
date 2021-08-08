import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HopHomeRoutingModule } from "./hop-home-routing.module";
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, HopHomeRoutingModule],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class HopHomeModule {}
