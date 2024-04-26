import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser, User } from '../models/auth.models';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { apiResponse } from '../models/apiResponse.model';
import { Router } from '@angular/router';
const HOSTNAME = environment.serverApi;
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

  status$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null
  );

  constructor(private http: HttpClient, private router: Router) {}

  register(
    email: string,
    username: string,
    password: string,
    userType: string
  ) {
    return this.http.post(
      `${HOSTNAME}/api/Auth/register`,
      {
        userType,
        email,
        username,
        password,
      },
      httpOptions
    );
  }

  login(username: string, password: string): Observable<{ data: IUser }> {
    return this.http
      .post(
        `${HOSTNAME}/api/Auth/login`,
        {
          username,
          password,
        },
        httpOptions
      )
      .pipe(
        map((res: any) => {
          return {
            data: User.createFromData(res),
          };
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  setLogin(user: User, token: string) {
    this.user$.next(user);
    this.token$.next(token);

    localStorage.setItem('currentUser', JSON.stringify(user));
    document.cookie = `token=${token}`;
  }

  setCurrentUser(user: User) {
    this.user$.next(user);
    this.status$.next(user.status);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  initStatus() {
    const currentUser = this.currentUser();
    this.status$.next(currentUser.status);
  }

  getStatus() {
    return this.status$.asObservable();
  }

  /**
   * Returns the current user
   */
  public currentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser')!) as User;
  }

  get currentUser$() {
    this.user$.next(this.currentUser());
    return this.user$.asObservable();
  }

  /**
   * Logout the user
   */
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.user$.next(null);
    this.token$.next(null);
    this.router.navigate(['/auth/login']);
  }

  resetPassword(data: any): Observable<apiResponse> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return this.http
      .post<apiResponse>(`${HOSTNAME}/api/Auth/forget-password`, formData)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  changePassword(data: any): Observable<apiResponse> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return this.http
      .post<apiResponse>(`${HOSTNAME}/api/Auth/change-password`, formData)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }
}
