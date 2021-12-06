import { Component, OnDestroy } from '@angular/core';
import { SettingsService, User } from '@delon/theme';
//import { User } from '@delon/theme';
import { LayoutDefaultOptions } from '@delon/theme/layout-default';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NavigationEnd, NavigationError, RouteConfigLoadStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'whoa-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.less']
})
export class BasicLayoutComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  isFetching = false;

  constructor(private router: Router, msg: NzMessageService, public settings: SettingsService) {
    router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((evt) => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError) {
        this.isFetching = false;
        msg.error(`Error while fetching ${evt.url}`, { nzDuration: 1000 * 3 });
        return;
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.isFetching = false;
    });
  }

  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/whoa-expanded.svg`,
    logoCollapsed: `./assets/whoa-collapsed.png`
  };
  searchToggleStatus = false;

  get user(): User {
    return this.settings.user;
  }

  get property() {
    return this.settings.getData("defaultProperty");
  }
  
  ngOnDestroy(): void {
    const { unsubscribe$ } = this;
    unsubscribe$.next();
    unsubscribe$.complete();
  }
}
