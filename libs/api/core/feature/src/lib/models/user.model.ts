

export class User implements Readonly<User> {
  sub: string;
  name: string;
  preferredUsername: string;
  givenName: string;
  familyName: string;
  email: string;
  //info
  exp: number;
  iat: number;
  authTime: number;
  jti: string;
  iss: string;
  typ: string;
  azp: string;
  sessionState: string;
  acr: string;
  realmAccess: unknown;
  scope: string;
  sid: string;
}