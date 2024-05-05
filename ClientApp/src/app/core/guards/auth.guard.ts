import { Injectable } from '@angular/core';
import {
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

// Auth Services
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtHelperService: JwtHelperService
  ) {}

  canActivate(state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUser();

    // check token in localStorage
    if (currentUser && currentUser.token && !this.jwtHelperService.isTokenExpired(currentUser.token)) {
      return true;
    }

    // check token in localStorage
    if (this.authService.user$.value) {
      return true;
    }

    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });

    return false;
  }
}
