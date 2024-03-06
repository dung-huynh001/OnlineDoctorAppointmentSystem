import { defineElement } from 'lord-icon-element';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessMsgComponent } from './auth/success-msg/success-msg.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { PasswordCreateComponent } from './auth/password-create/password-create.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountRoutingModule } from './account-routing.module';
import { ToastsContainer } from './login/toasts-container.component';
import lottie from 'lottie-web';



@NgModule({
  declarations: [
    SuccessMsgComponent,
    LogoutComponent,
    PasswordCreateComponent,
    PasswordResetComponent,
    LoginComponent,
    RegisterComponent,
    ToastsContainer,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbToastModule,
    AccountRoutingModule,
  ],
  exports: [ToastsContainer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
