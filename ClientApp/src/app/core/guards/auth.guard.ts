import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

// Auth Services
import { AuthService } from '../services/auth.service';
import { RoleAccess } from '../models/roleAccess';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtHelperService: JwtHelperService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUser();
    const roleAccess = RoleAccess;

    // check token
    if (!currentUser.token || this.jwtHelperService.isTokenExpired(currentUser.token)) {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url },
      });
    }

    const currAccess = roleAccess.filter(
      (item) => item.role === currentUser.userType
    )[0];

    // check role
    // if (!currAccess.access.includes(route.url[0].path)) {
    //   this.router.navigate(['/pages/access-denied'], {
    //     queryParams: { returnUrl: state.url },
    //   });
    // }

    return true;
  }
}
