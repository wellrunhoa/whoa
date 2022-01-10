import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, Observable } from 'rxjs';

import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private httpService: HttpService, private config: ConfigService) {}

  accountUrl() {
    return `${this.config.get<string>('keycloak.authServerUrl')}/realms/${this.config.get<string>('keycloak.realm')}/account/`;
  }

  updateUser(user: UserDTO): Observable<UserDTO> {
    this.logger.debug('user:' + user);
    return this.httpService.post(this.accountUrl(), user).pipe(
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

  getUser(): Observable<UserDTO> {
    return this.httpService.get(this.accountUrl()).pipe(
      map((resp) => resp.data),
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
