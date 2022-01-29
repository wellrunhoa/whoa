import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { UpdatePasswordDTO } from '../dto/update-password.dto';

import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private httpService: HttpService, private config: ConfigService) {}

  accountUrl() {
    return `${this.config.get<string>('keycloak.authServerUrl')}/realms/${this.config.get<string>('keycloak.realm')}/account`;
  }

  updateUser(user: UserDTO): Observable<UserDTO> {
    const kcUser = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      email: user.email,
      attributes: {
        mobilePhone: [user.mobilePhone],
        homePhone: [user.homePhone],
        workPhone: [user.workPhone]
      }
    };
    return this.httpService.post(this.accountUrl(), kcUser).pipe(
      map(() => {
        return user;
      }),
      catchError((e) => {
        if (e.response) {
          throw new HttpException(e.response.data, e.response.status);
        } else {
          throw new Error(e.message);
        }
      })
    );
  }

  updatePassword(user: UpdatePasswordDTO): Observable<string> {
    return this.httpService.post(`${this.accountUrl()}/credentials/password`, user).pipe(
      map(() => {
        return 'Successfully updated';
      }),
      catchError((e) => {
        if (e.response) {
          throw new HttpException(e.response.data, e.response.status);
        } else {
          throw new Error(e.message);
        }
      })
    );
  }

  getUser(): Observable<UserDTO> {
    return this.httpService.get(this.accountUrl()).pipe(
      map((resp) => resp.data),
      map((kcUser) => {
        const user = {
          username: kcUser.username,
          firstName: kcUser.firstName,
          lastName: kcUser.lastName,
          middleName: kcUser.middleName,
          email: kcUser.email
        } as UserDTO;

        if (kcUser.attributes) {
          if (kcUser.attributes['mobilePhone']) {
            user.mobilePhone = kcUser.attributes['mobilePhone'][0];
          }
          if (kcUser.attributes['homePhone']) {
            user.homePhone = kcUser.attributes['homePhone'][0];
          }
          if (kcUser.attributes['workPhone']) {
            user.workPhone = kcUser.attributes['workPhone'][0];
          }
        }
        return user;
      }),
      catchError((e) => {
        if (e.response) {
          throw new HttpException(e.response.data, e.response.status);
        } else {
          throw new Error(e.message);
        }
      })
    );
  }
}
