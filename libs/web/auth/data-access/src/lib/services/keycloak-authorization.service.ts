/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map as __map, catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpParameterCodec,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { KeycloakAuthzOptions } from '../models/keycloak-authz-options';
import {
  KeycloakAuthorizationRequest,
  ResourcePermission,
  KeycloakAuthorizationRequestMetaData
} from '../models/keycloak-authorization-request';
import {
  KeycloakResourcePermission,
  KeycloakResourcePermissionsCheck
} from '../models/keycloak-permissions';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

/**
 * Custom parameter codec to correctly handle the plus sign in parameter
 * values. See https://github.com/angular/angular/issues/18261
 */
class ParameterCodec implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
const PARAMETER_CODEC = new ParameterCodec();

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthorizationService {
  private authzOptions!: KeycloakAuthzOptions;

  /**
   * Contains the RPT-Token after successfull Get-Entitlement-Call
   */
  private _rpt!: string;

  /**
   * Contains all permissions decoded from the RPT-Token after successful Get-Entitlement-Call
   */
  private _permissions: any[] = [];

  constructor(private http: HttpClient, private authStorage: OAuthStorage) {}

  private newParams(): HttpParams {
    return new HttpParams({
      encoder: PARAMETER_CODEC
    });
  }

  /**
   * KeycloakAuthorization initialization. It should be called to initialize the adapter.
   * Options is a object with 2 main parameters: config and initOptions. The first one
   * will be used to connect to Keycloak. The second one are options to initialize the
   * keycloak authorization instance.
   *
   * @param options
   * config: an object with the following content:
   * - url: Keycloak json URL
   * - realm: realm name
   * - clientId: client id
   *
   * initOptions:
   * - defaultResourceServerId: specifies the default resource-server
   * - loadPermissionsInStartup: if set to true, load all permissions for default resource-server at initializiation of adapter
   *
   *
   */
  init(options: KeycloakAuthzOptions) {
    this.authzOptions = options;
  }

  /**
   * Checks if user has the required access to a resource and/or scope.
   *
   * @param authorization
   * - check object
   * - rsname : Name of the resource
   * - scope : name of the scope
   *
   *
   * @returns boolean true if user has access, false if not
   */
  public checkAuthorization(authorization: KeycloakResourcePermissionsCheck) {
    return this.hasAuthorization(authorization);
  }

  /**
   * Internal method to check if user has the required access to a resource and/or scope
   *
   * @param authorization
   *
   * @returns boolean true if user has access, false if not
   */
  private hasAuthorization(authorization: KeycloakResourcePermissionsCheck): boolean {
    const checkForResource = authorization.rsname;
    const checkForScope = authorization.scope;

    if (this._permissions.length > 0) {
      const filteredResource = this._permissions.find((t) => {
        if (t.rsname === checkForResource) return t;
      });
      //No access to resource
      if (!filteredResource) {
        //console.log("no access to resource granted");
        return false;
      }
      //access to resource granted and no scope checking required
      if (!checkForScope) {
        //console.log("no scope checking required.required auth is present - hooray");
        return true;
      }
      //scope checking required, but resource has no scope defined
      if (!filteredResource.scopes || filteredResource.scopes.length === 0) {
        //console.log("scope checking required, but no scopes defined for resource");
        return false;
      }
      const filteredScope = filteredResource.scopes.find((t: any) => {
        if (t === checkForScope) return t;
      });
      //no access to scope
      if (!filteredScope) {
        //console.log("required scope not found");
        return false;
      }
      //console.log("required auth is present - hooray");
      return true;
    }
    //console.log("no permissions loaded (yet)");
    return false;
  }

  /**
   * Return an array of all permissions present for the logged-in user
   *
   * @returns Array of permissions
   */
  public async getPermissions(): Promise<KeycloakResourcePermission[]> {
    if (!this._permissions || this._permissions.length === 0) {
      return this.getAuthorizations(this.authzOptions.config.clientId || 'whoa-client', {});
    }
    return this._permissions;
  }

  /**
   * Gets authorizations for resource-server from keycloak. Also stores the permissions for future use
   *
   * @param resourceServerId
   * The resource server for which the entitlements of the current user are checked
   * @param authorizationRequest
   *
   * @returns Authorizations-Object
   */
  public getAuthorizations(
    resourceServerId: string,
    authorizationRequest: KeycloakAuthorizationRequest
  ): Promise<KeycloakResourcePermission[]> {
    const perm = new Promise<KeycloakResourcePermission[]>((resolve, reject) => {
      this.getEntitlement(resourceServerId, authorizationRequest)
        .pipe(untilDestroyed(this))
        .subscribe((res) => {
          try {
            let permissions = [];
            if (res.access_token) {
              this._rpt = res.access_token;
              const decodedToken = this.decodeToken(res.access_token);
              if (decodedToken.authorization) {
                if (decodedToken.authorization.permissions) {
                  permissions = decodedToken.authorization.permissions;
                }
              }
            }
            this._permissions = permissions;

            resolve(permissions);
          } catch (error) {
            reject(error);
          }
        });
    });

    return perm;
  }

  /**
   * Gets entitlement fron resource-server from keycloak
   *
   * @param resourceServerId
   * The resource server for which the entitlements of the current user are checked
   *
   * @param authorizationRequest
   *
   * @returns Object with RPT-Token containing the authorizations/entitlement
   */
  private getEntitlement(
    resourceServerId: string,
    authorizationRequest: KeycloakAuthorizationRequest
  ) {
    let __params = this.newParams();
    let __headers = new HttpHeaders();

    __headers = __headers.set('Content-type', 'application/x-www-form-urlencoded');
    __headers = __headers.set(
      'Authorization',
      'Bearer ' + this.authStorage.getItem('access_token')
    );

    if (!authorizationRequest) {
      authorizationRequest = {};
    }

    __params = __params.set('grant_type', 'urn:ietf:params:oauth:grant-type:uma-ticket');
    //__params = __params.set('client_id', this.authzOptions.config.clientId || '');
    __params = __params.set('audience', resourceServerId);

    if (authorizationRequest.claimToken) {
      __params = __params.set('claim_token', authorizationRequest.claimToken);
      if (authorizationRequest.claimTokenFormat) {
        __params = __params.set('claim_token_format', authorizationRequest.claimTokenFormat);
      }
    }

    const permissions: ResourcePermission[] = authorizationRequest.permissions || [];

    for (let i = 0; i < permissions.length; i++) {
      const resource = permissions[i];
      let permission = resource.id;

      if (resource.scopes && resource.scopes.length > 0) {
        permission += '#';
        for (let j = 0; j < resource.scopes.length; j++) {
          const scope = resource.scopes[j];
          if (permission.indexOf('#') != permission.length - 1) {
            permission += ',';
          }
          permission += scope;
        }
      }

      __params = __params.append('permission', permission);
    }

    const metadata: KeycloakAuthorizationRequestMetaData = authorizationRequest.metadata || {};

    if (metadata) {
      if (metadata.responseIncludeResourceName) {
        __params = __params.set(
          'response_include_resource_name',
          metadata.responseIncludeResourceName
        );
      }
      if (metadata.responsePermissionsLimit) {
        __params = __params.set(
          'response_permissions_limit',
          metadata.responsePermissionsLimit.toString()
        );
      }
    }

    if (this._rpt) {
      __params = __params.set('rpt', this._rpt);
    }

    return this.http
      .post<any>(
        this.authzOptions.config.issuer + '/protocol/openid-connect/token',
        __params.toString(),
        {
          headers: __headers,
          responseType: 'json'
        }
      )
      .pipe(
        catchError(this.handleError),
        __map((_r) => {
          //console.log(_r);
          return _r;
        })
      );
  }

  /**
   * Decodes RPT-Token
   *
   * @param str - enoded token string
   *
   * @returns Decoded jwt-token object
   *
   */
  private decodeToken(str: string) {
    str = str.split('.')[1];

    str = str.replace('/-/g', '+');
    str = str.replace('/_/g', '/');
    switch (str.length % 4) {
      case 0:
        break;
      case 2:
        str += '==';
        break;
      case 3:
        str += '=';
        break;
      default:
        throw 'Invalid token';
    }

    str = (str + '===').slice(0, str.length + (str.length % 4));
    str = str.replace(/-/g, '+').replace(/_/g, '/');

    str = decodeURIComponent(escape(atob(str)));

    const res = JSON.parse(str);
    return res;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
