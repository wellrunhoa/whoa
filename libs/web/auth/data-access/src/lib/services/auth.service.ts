import { Injectable } from '@angular/core';
import { Authenticate } from '../models/authenticate';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@delon/theme';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject$ = new BehaviorSubject<User>({ avatar: '', name: '' });
  user$ = this.userSubject$.asObservable();
  //private loginSubject$ = new BehaviorSubject<boolean>(false);
  //isLoggedIn$ = this.loginSubject$.asObservable();

  constructor(private httpClient: HttpClient) {}

  login(authenticate: Authenticate): Observable<User> {
    // return this.httpClient
    //   .post<User>('http://localhost:3000/login', authenticate)
    //   .pipe(tap((user: User) => this.userSubject$.next(user)));
    if (authenticate.username === 'user' && authenticate.password === 'password') {
      this.userSubject$.next({ avatar: '', name: 'Test User', email: 'test@whoa.com' });
    }
    return this.user$;
  }
}
