import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';

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
    public toastService: ToastService
  ) {
    // redirect to home if already logged in
    if (this.authService.user$.value) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('toast')) {
      this.toastService.success('Account registration successful! Please log in to continue');
      localStorage.removeItem('toast');
    }

    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      username: ['d1', [Validators.required]],
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
      // Login Api
      this.authService
        .login(this.f['username'].value, this.f['password'].value)
        .pipe(
          catchError((err) => {
            this.toastService.error(err.Message);
            return throwError(() => err);
          })
        )
        .subscribe((res) => {
          if (res.data.token) {
            localStorage.setItem('toast', 'true');
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            localStorage.setItem('token', res.data.token);
            this.authService.setLogin(res.data, res.data.token);

            const role = res.data.userType;
            this.router.navigate([`/${role}`]);
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
