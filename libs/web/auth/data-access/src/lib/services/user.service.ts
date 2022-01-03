import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  // updateUser(user: UserProfile): Observable<UserProfile> {
  //   return this.http.post(this.accountUrl(), user).pipe(
  //     map(() => {
  //       return user;
  //     })
  //   );
  // }

  getUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`api/passport/user`).pipe(map((res) => res));
  }
}
