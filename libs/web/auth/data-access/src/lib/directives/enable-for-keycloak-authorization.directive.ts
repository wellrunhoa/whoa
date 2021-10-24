import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { KeycloakAuthorizationService } from '../services/keycloak-authorization.service';
import { KeycloakResourcePermissionsCheck } from '../models/keycloak-permissions';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[enableForKeycloakAuthorization]'
})
export class EnableForKeycloakAuthorizationDirective implements OnInit {
  @Input('enableForKeycloakAuthorization') requiredAuthorization!: string;

  constructor(
    private element: ElementRef,
    private keycloakAngular: AuthService,
    private authService: KeycloakAuthorizationService
  ) {}

  ngOnInit() {
    this.noAuthPresentAction();

    let authCheck = <KeycloakResourcePermissionsCheck>{};
    if (this.requiredAuthorization.includes('#')) {
      const authArr = this.requiredAuthorization.split('#');
      authCheck = {
        rsname: authArr[0],
        scope: authArr[1]
      };
    } else {
      authCheck = {
        rsname: this.requiredAuthorization
      };
    }

    if (this.keycloakAngular.hasValidToken() && this.authService.checkAuthorization(authCheck)) {
      this.authPresentAction();
    }
  }

  private authPresentAction() {
    this.element.nativeElement.disabled = false;
  }

  private noAuthPresentAction() {
    this.element.nativeElement.disabled = true;
  }
}
