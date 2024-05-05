import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { PasswordCreateComponent } from './auth/password-create/password-create.component';
import { LogoutComponent } from './auth/logout/logout.component';

const routes: Routes = [
  {
    path: 'pass-reset',
    component: PasswordResetComponent,
  },
  {
    path: 'pass-create',
    component: PasswordCreateComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
