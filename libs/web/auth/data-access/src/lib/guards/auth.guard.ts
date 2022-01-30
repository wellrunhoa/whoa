import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { filter, tap, map, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { KeycloakAuthorizationService } from '../services/keycloak-authorization.service';
import { KeycloakResourcePermission } from '../models/keycloak-permissions';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isAuthenticated = false;

  constructor(private authService: AuthService, protected keycloakAuth: KeycloakAuthorizationService) {
    this.authService.isAuthenticated$.pipe(untilDestroyed(this)).subscribe((i: boolean) => (this.isAuthenticated = i));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isDoneLoading$
      .pipe(filter((isDone) => isDone))
      .pipe(tap(() => this.isAuthenticated || this.authService.login(state.url)))
      .pipe(map(() => this.isAuthenticated)) //authn
      .pipe(
        switchMap((isAuthenticated) => {
          if (isAuthenticated) {
            return this.keycloakAuth.getPermissions().then((permissions) => {
              return this.isAccessAllowed(route, state, permissions);
            });
          }
          return of(isAuthenticated);
        })
      );
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, permissions: KeycloakResourcePermission[]): boolean {
    const requiredPermissions = route.data.permissions;
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    } else {
      if (!permissions || permissions.length === 0) {
        return false;
      }
      let granted = false;
      for (const requiredPermission of requiredPermissions) {
        if (this.keycloakAuth.checkAuthorization(requiredPermission)) {
          granted = true;
          break;
        }
      }
      return granted;
    }
  }
}
