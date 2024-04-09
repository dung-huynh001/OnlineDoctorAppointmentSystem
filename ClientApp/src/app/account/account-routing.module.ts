import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { PasswordCreateComponent } from './auth/password-create/password-create.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SuccessMsgComponent } from './auth/success-msg/success-msg.component';

const routes: Routes = [
  {
    path: 'pass-reset',
    component: PasswordResetComponent,
  },
  {
    path: 'pass-create',
    component: PasswordCreateComponent,
  },
  // {
  //   path: 'lockscreen', loadChildren: () => import('./auth/lockscreen/lockscreen.module').then(m => m.LockscreenModule)
  // },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'success-msg',
    component: SuccessMsgComponent
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
