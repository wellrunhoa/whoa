import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from "@whoa/web/shared/ui/layout";
import { LoginModule } from "@whoa/web/auth/feature/login";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  imports: [CommonModule, LayoutModule, LoginModule, AuthRoutingModule]
})
export class AuthShellModule {}
