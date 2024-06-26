import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private _toastService: ToastService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
          // auto logout if 401 response returned from api
          // this.authService.logout();
          // location.reload();

          setTimeout(() => {
            this.router.navigate(['/pages/access-denied']);
          }, 200);
        }
        const res: {
          message: string;
          statusCode: number;
        } = err.error;
        // if (err instanceof HttpErrorResponse) {
        //     if (err.status === 400) {
        //         const response: {
        //             Message: string;
        //             StatusCode: number;
        //         } = err.error;
        //         this._toastService.error(response.Message);
        //         return throwError(() => response);
        //     }
        //     const error = err.error.message || err.statusText;
        //     return throwError(() => error);
        // }

        return throwError(() => res);
      })
    );
  }
}
