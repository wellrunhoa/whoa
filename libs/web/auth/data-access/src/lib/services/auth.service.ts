import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, BehaviorSubject, ReplaySubject, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EventService } from '@whoa/web/core/data-access';
import { AuthConfigService } from '@whoa/web/core/data-access';
import { KeycloakAuthorizationService } from './keycloak-authorization.service';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new ReplaySubject<boolean>();
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  /**
   * Publishes `true` if and only if (a) all the asynchronous initial
   * login calls have completed or errored, and (b) the user ended up
   * being authenticated.
   *
   * In essence, it combines:
   *
   * - the latest known state of whether the user is authorized
   * - whether the ajax calls for initial log in have all been done
   */
  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
    this.isAuthenticated$,
    this.isDoneLoading$
  ]).pipe(map((values) => values.every((b) => b)));

  constructor(
    private oauthService: OAuthService,
    private authzService: KeycloakAuthorizationService,
    private settings: SettingsService,
    private eventService: EventService,
    private authConfigService: AuthConfigService,
    private router: Router
  ) {
    this.oauthService.configure(this.authConfigService.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.events.pipe(untilDestroyed(this)).subscribe(() => {
      this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
    });

    this.eventService
      .on('whoa:logout')
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.oauthService.revokeTokenAndLogout();
        this.router.navigate(['/']);
      });

    this.canActivateProtectedRoutes$
      .pipe(untilDestroyed(this))
      .pipe(filter((a) => a))
      .subscribe(() => {
        this.settings.setUser(this.oauthService.getIdentityClaims());
        //this.authzService.getAuthorizations("whoa-client", {});
      });

    this.authzService.init({ config: this.authConfigService.authzConfig });
  }

  public runInitialLoginSequence(): Promise<void> {
    return this.oauthService
      .loadDiscoveryDocument()
      .then(() => this.oauthService.tryLoginCodeFlow())
      .then(() => {
        this.isDoneLoadingSubject$.next(true);
        // remove query params
        this.router.navigate(['']);
      })
      .catch(() => this.isDoneLoadingSubject$.next(true));
  }

  public identityClaims() {
    return this.oauthService.getIdentityClaims();
  }

  public login() {
    this.oauthService.initCodeFlow();
  }
  public logout() {
    this.oauthService.logOut();
  }
  public refresh() {
    this.oauthService.silentRefresh();
  }
  public hasValidToken() {
    return this.oauthService.hasValidAccessToken();
  }
}
