import { Injectable } from '@angular/core';
import { AuthConfig, OAuthModuleConfig, OAuthResourceServerConfig } from 'angular-oauth2-oidc';

interface Auth {
  authServer: AuthConfig;
  authzServer: AuthConfig;
  resourceServer: OAuthResourceServerConfig;
  authzOptions?: KeycloakAuthzInitOptions;
}

export interface KeycloakAuthzInitOptions {
  /**
   * if set to true, load all permissions for default resource-server
   * at initializiation of adapter
   *
   */
  loadPermissionsInStartup?: boolean;

  /**
   * specifies the default resource-server where the entitlements are loaded from
   * after adpater initialization
   *
   * Is only relevant if loadPermissionsInStartup is set to true
   *
   */
  defaultResourceServerId?: string;
}

const authDefaultConfig: AuthConfig = {
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/',
  responseType: 'code',
  disableAtHashCheck: false,
  scope: 'openid profile offline_access',
  useSilentRefresh: false,
  showDebugInformation: true
};

const resourceDefaultConfig: OAuthResourceServerConfig = {
  sendAccessToken: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthConfigService {
  private _config!: Auth;

  public set config(v: Auth) {
    this._config = v;
  }

  public get authConfig(): AuthConfig {
    return { ...authDefaultConfig, ...this._config.authServer };
  }

  public get authzConfig(): AuthConfig {
    return { ...this.authConfig, ...this._config.authzServer };
  }

  public get resourceServerConfig(): OAuthModuleConfig {
    return { resourceServer: { ...resourceDefaultConfig, ...this._config.resourceServer } };
  }
}
