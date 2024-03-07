import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../login/toast-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnChanges {
  signupForm!: UntypedFormGroup;
  submitted = false;
  // compareToValidator: compareTo
  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private _toastService: ToastService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
    this.signupForm = this.formBuilder.group({
      userType: ['patient'],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  /**
   * Register submit form
   */
  onSubmit() {
    this.submitted = true;

    if (
      this.f['confirmPassword'].value &&
      this.f['confirmPassword'].value !== this.f['password'].value
    ) {
      this.f['confirmPassword'].setErrors({ compare: true });
      this.f['password'].setErrors({ compare: true });
      return;
    }

    //Register Api
    if (this.signupForm.valid) {
      this.authService
        .register(
          this.f['email'].value,
          this.f['username'].value,
          this.f['password'].value,
          this.f['userType'].value
        )
        .pipe(
          catchError((err) => {
            const erorrDetail: {
              Message: string;
              Status: number;
            } = err;
            this._toastService.error(erorrDetail.Message);
            console.log(erorrDetail);
            return throwError(() => err);
          })
        )
        .subscribe((data: any) => {
          localStorage.setItem('toast', 'true');
          this.router.navigate(['/auth/login']);
        });
    }
  }
}
