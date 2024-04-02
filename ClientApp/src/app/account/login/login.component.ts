import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private _spinnerService: NgxSpinnerService
  ) {
    // redirect to home if already logged in
    if (this.authService.user$.value) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('toast')) {
      this.toastService.success(
        'Account registration successful! Please log in to continue'
      );
      localStorage.removeItem('toast');
    }

    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      username: ['admin', [Validators.required]],
      password: ['abcd1234', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this._spinnerService.show();
      // Login Api
      this.authService
        .login(this.f['username'].value, this.f['password'].value)
        .pipe(
          catchError((err) => {
            if (err.Message) this.toastService.error(err.Message);
            else
              this.toastService.error(
                'Cannot connected to server. Please check your connection again'
              );
            return throwError(() => err);
          }),
          finalize(() => {
            this._spinnerService.hide();
          })
        )
        .subscribe((res) => {
          if (res.data.token) {
            localStorage.setItem('toast', 'true');
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            localStorage.setItem('token', res.data.token);
            this.authService.setLogin(res.data, res.data.token);

            const role = res.data.userType;
            this.router.navigate([`/${role}/dashboard`]);
          }
        });
    }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
