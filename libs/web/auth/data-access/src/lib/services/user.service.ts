import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UpdatePassword } from '../..';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateUser(user: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>('api/passport/user', user);
  }

  updatePassword(user: UpdatePassword): Observable<string> {
    return this.http.post<string>('api/passport/credentials', user);
  }

  getUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>('api/passport/user').pipe(map((res) => res));
  }
}
