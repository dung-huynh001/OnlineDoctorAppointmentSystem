import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser, User } from '../models/auth.models';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null
  );
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    this.user$.subscribe((value) => console.log(value));
  }

  register(email: string, username: string, password: string, userType: string) {
    return this.http.post(
      `${environment.serverApi}/api/Auth/register`,
      {
        userType,
        email,
        username,
        password,
      },
      httpOptions
    );
  }

  login( username: string, password: string): Observable<{ data: IUser }> {
    return this.http.post( `${environment.serverApi}/api/Auth/login`,
        {
          username,
          password,
        },
        httpOptions)
      .pipe(
        map((res) => {
          return {
            data: User.createFromData(res),
          };
        }),
        catchError(err => { return throwError(() => err) })
      );
  }

  setLogin(user: User, token: string) {
    this.user$.next(user);
    this.token$.next(token);
  }

  /**
   * Returns the current user
   */
  public currentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser')!) as Object;
  }

  /**
   * Logout the user
   */
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.user$.next(null);
    this.token$.next(null);
  }
}
