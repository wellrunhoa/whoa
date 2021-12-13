import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { UserContextService } from '@whoa/web/core/data-access';
import { PropertyService } from '../services/property.service';
import { AuthService } from '@whoa/web/auth/data-access';

@Injectable({
  providedIn: 'root'
})
export class PropertyGuard implements CanActivate {
  constructor(
    private service: PropertyService,
    private userContextService: UserContextService,
    private authService: AuthService,
    private router: Router
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userContextService.property) {
      return true;
    }

    return this.authService.canActivateProtectedRoutes$.pipe(
      switchMap(() => {
        return this.service.getDefaultProperty().pipe(
          tap((p) => this.userContextService.setProperty(p)),
          catchError((error) => {
            if (error.status === 404) {
              return of(false);
            }
            return of(error);
          }),
          map(() => {
            if(this.userContextService.property) {
              return true;
            }
            return this.router.parseUrl('property/add');
          })
        );
      })
    );
  }
}
