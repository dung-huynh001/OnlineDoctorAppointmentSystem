import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SuccessMsgComponent } from './auth/success-msg/success-msg.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { PasswordCreateComponent } from './auth/password-create/password-create.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    SuccessMsgComponent,
    LogoutComponent,
    PasswordCreateComponent,
    PasswordResetComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
