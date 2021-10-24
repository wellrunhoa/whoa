/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { OAuthStorage, OAuthModuleConfig } from 'angular-oauth2-oidc';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppInjector, AuthConfigService } from '@whoa/web/core/data-access';

@Injectable()
export class DefaultOAuthInterceptor implements HttpInterceptor {
  private moduleConfig!: OAuthModuleConfig;

  private checkUrl(url: string): boolean {
    if (this.moduleConfig.resourceServer.allowedUrls) {
      const found = this.moduleConfig.resourceServer.allowedUrls.find((u) => url.startsWith(u));
      return !!found;
    }
    return false;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.moduleConfig) {
      this.moduleConfig = AppInjector.get(AuthConfigService).resourceServerConfig;
    }
    const url = req.url.toLowerCase();

    if (!this.moduleConfig) return next.handle(req);
    if (!this.moduleConfig.resourceServer) return next.handle(req);
    if (!this.moduleConfig.resourceServer.allowedUrls) return next.handle(req);
    if (!this.checkUrl(url)) return next.handle(req);

    const sendAccessToken = this.moduleConfig.resourceServer.sendAccessToken;

    if (sendAccessToken) {
      const token = AppInjector.get(OAuthStorage).getItem('access_token');
      const header = 'Bearer ' + token;

      const headers = req.headers.set('Authorization', header);

      req = req.clone({ headers });
    }

    return next.handle(req); //.catch((err) => this.errorHandler.handleError(err));
  }
}
