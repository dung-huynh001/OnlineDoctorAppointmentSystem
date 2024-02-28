import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getFirebaseBackend } from '../../authUtils';
import { IUser, User } from '../models/auth.models';
import { BehaviorSubject, Observable, map } from 'rxjs';
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

  /**
   * Performs the register
   * @param email email
   * @param password password
   */
  register(email: string, first_name: string, password: string) {
    return this.http.post(
      `${environment.server_url}/auth/register`,
      {
        email,
        first_name,
        password,
      },
      httpOptions
    );
  }

  /**
   * Performs the auth
   * @param email email of user
   * @param password password of user
   */
  login(
    email: string,
    password: string
  ): Observable<{
    data: User;
    token: string;
    status: string;
  }> {
    return this.http
      .post<{
        data: IUser;
        token: string;
        status: string;
      }>(
        `${environment.server_url}/auth/signin`,
        {
          email,
          password,
        },
        httpOptions
      )
      .pipe(
        map((res) => {
          return {
            ...res,
            data: User.createFromData(res.data),
          };
        })
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
    return getFirebaseBackend()!.getAuthenticatedUser();
  }

  /**
   * Logout the user
   */
  logout() {
    // logout the user
    // return getFirebaseBackend()!.logout();
    // localStorage.removeItem('currentUser');
    // localStorage.removeItem('token');
    // this.currentUserSubject.next(null!);
    this.user$.next(null);
  }

  /**
   * Reset password
   * @param email email
   */
  resetPassword(email: string) {
    return getFirebaseBackend()!
      .forgetPassword(email)
      .then((response: any) => {
        const message = response.data;
        return message;
      });
  }
}
