import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from '@whoa/web/property/feature/add-property';

const routes: Routes = [
  {
    path: 'add',
    component: AddPropertyComponent,
    data: { title: 'Add Property', titleI18n: 'app.add.property' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule {}
