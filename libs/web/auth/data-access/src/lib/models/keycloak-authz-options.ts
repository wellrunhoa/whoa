import { AuthConfig } from 'angular-oauth2-oidc';
import { KeycloakAuthzInitOptions } from '@whoa/web/core/data-access';


export interface KeycloakAuthzOptions {
    
    config: AuthConfig;
    
    /**
     * Options to initialize the adapter. Used by keycloak-js.
     */
    initOptions?: KeycloakAuthzInitOptions;
    
}
