import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFormComponent } from './payment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ZorroProviderModule } from '@whoa/web/shared/ui/zorro-provider';
import { LayoutModule } from '@whoa/web/core/ui/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ZorroProviderModule, LayoutModule, NzCardModule, NzTabsModule, NzFormModule, NzButtonModule],
  declarations: [PaymentFormComponent],
  exports: [PaymentFormComponent]
})
export class PaymentFormModule {}
