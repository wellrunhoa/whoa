import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthDataAccessModule } from '@whoa/web/auth/data-access';

@NgModule({
  imports: [CommonModule, AuthDataAccessModule]
})
export class UtilsModule {}
