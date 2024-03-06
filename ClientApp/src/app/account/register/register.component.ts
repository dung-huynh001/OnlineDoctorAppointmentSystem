import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { catchError, first } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  signupForm!: UntypedFormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  isMatches = false;
  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

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

    //Register Api
    if (
      this.f['userType'].valid &&
      this.f['email'].valid &&
      this.f['username'].valid &&
      this.f['password'].valid &&
      this.f['confirmPassword'].valid
    ) {
      this.authService
        .register(
          this.f['userType'].value,
          this.f['email'].value,
          this.f['username'].value,
          this.f['password'].value
        )
        .pipe(catchError((err) => (this.error = err ? err : '')))
        .subscribe((data: any) => {
          this.successmsg = true;
          if (this.successmsg) {
            this.router.navigate(['/auth/login']);
          }
        });
    }
  }
}
