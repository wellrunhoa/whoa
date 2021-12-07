import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of } from 'rxjs';
import { EventService, UserContextService } from '@whoa/web/core/data-access';
import { PropertyService } from '../services/property.service';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class PropertyGuard implements CanActivate {
  constructor(
    private service: PropertyService,
    private userContextService: UserContextService,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventService
      .on('whoa:authenticated')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        //if (!this.userContextService.property) {
          this.service
            .getDefaultProperty()
            .pipe(untilDestroyed(this))
            .subscribe((d) => {
              this.userContextService.setProperty(d);
            });
        //}
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userContextService.property) {
      return of(true);
    }
    return this.router.parseUrl('property/add');
  }
}
