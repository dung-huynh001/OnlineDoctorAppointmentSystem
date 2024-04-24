import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent implements OnInit {
  // Login Form
  passResetForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _authService: AuthService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
    this.passResetForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Username: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.passResetForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.passResetForm.valid) {
      this._authService
        .resetPassword(this.passResetForm.value)
        .subscribe((res) => {
          if (res.isSuccess) {
            this._toastService.success(res.message);
            this.passResetForm.reset();
          } else {
            this._toastService.error(res.message);
          }
        });
    }
  }
}
