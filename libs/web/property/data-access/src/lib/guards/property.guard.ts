import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, filter, Observable, of, ReplaySubject, tap } from 'rxjs';
import { EventService } from '@whoa/web/core/data-access';
import { PropertyService } from '../services/property.service';
import { SettingsService } from '@delon/theme';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class PropertyGuard implements CanActivate {
  constructor(
    private service: PropertyService,
    private settings: SettingsService,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventService
      .on('whoa:authenticated')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.service
          .getDefaultProperty()
          .pipe(
            untilDestroyed(this)
          )
          .subscribe((d) => {
            this.settings.setData('defaultProperty', d);
          }
          );
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const prop = this.settings.getData('defaultProperty');
    if (prop !== null) {
      return of(true);
    }
    return this.router.parseUrl('property/add');
  }
}
