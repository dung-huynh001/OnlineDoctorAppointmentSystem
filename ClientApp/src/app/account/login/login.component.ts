import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from './toast-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
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
    public toastservice: ToastService
  ) {
    // redirect to home if already logged in
    if (this.authService.user$.value) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // if (localStorage.getItem('currentUser')) {
    //   this.router.navigate(['/']);
    // }
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
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

    // Login Api
    this.authService
      .login(this.f['email'].value, this.f['password'].value)
      // .subscribe((data: any) => {
      //   if (data.token != null) {
      //     localStorage.setItem('toast', 'true');
      //     localStorage.setItem('currentUser', JSON.stringify(data.data));
      //     localStorage.setItem('token', data.token);
      //     this.router.navigate(['/']);
      //   } else {
      //     this.toastservice.show(data.data, {
      //       classname: 'bg-danger text-white',
      //       delay: 15000,
      //     });
      //   }
      // });
      .subscribe((data) => {
        if (data.status == 'success') {
          localStorage.setItem('toast', 'true');
          localStorage.setItem('currentUser', JSON.stringify(data.data));
          localStorage.setItem('token', data.token);
          this.authService.setLogin(data.data, data.token);
          
          this.router.navigate(['/']);
        } else {
          this.toastservice.show("Login failed!", {
            classname: 'bg-danger text-white',
            delay: 15000,
          });
        }
      });
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
