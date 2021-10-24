import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '@whoa/web/auth/data-access';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'whoa-root',
  //templateUrl: './app.component.html',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private modalSrv: NzModalService,
    authService: AuthService
  ) {
    //renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
    authService.runInitialLoginSequence().then();
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe(() => {
      this.modalSrv.closeAll();
    });
  }
}
