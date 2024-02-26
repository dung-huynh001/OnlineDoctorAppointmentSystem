import { Injectable } from '@angular/core';
import { GlobalComponent } from '../../global-component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getFirebaseBackend } from '../../authUtils';
import { User } from '../models/auth.models';
import { BehaviorSubject } from 'rxjs';

const AUTH_API = GlobalComponent.AUTH_API;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User;
  currentUserValue: any;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) { 
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
  }

  /**
   * Performs the register
   * @param email email
   * @param password password
   */
   register(email: string, first_name: string, password: string) {
      // return getFirebaseBackend()!.registerUser(email, password).then((response: any) => {
      //     const user = response;
      //     return user;
      // });

       // Register Api
       return this.http.post(AUTH_API + 'signup', {
          email,
          first_name,
          password,
        }, httpOptions);
  }

  /**
   * Performs the auth
   * @param email email of user
   * @param password password of user
   */
  login(email: string, password: string) {
      // return getFirebaseBackend()!.loginUser(email, password).then((response: any) => {
      //     const user = response;
      //     return user;
      // });

      return this.http.post(AUTH_API + 'signin', {
          email,
          password
        }, httpOptions);
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
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      this.currentUserSubject.next(null!);
  }

  /**
   * Reset password
   * @param email email
   */
  resetPassword(email: string) {
      return getFirebaseBackend()!.forgetPassword(email).then((response: any) => {
          const message = response.data;
          return message;
      });
  }
}
