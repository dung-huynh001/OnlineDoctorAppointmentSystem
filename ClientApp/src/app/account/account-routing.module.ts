import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { PasswordCreateComponent } from './auth/password-create/password-create.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SuccessMsgComponent } from './auth/success-msg/success-msg.component';

const routes: Routes = [
  {
    // path: 'signin', loadChildren: () => import('./auth/signin/signin.module').then(m => m.SigninModule)
    path: 'signin',
    component: SigninComponent,
  },
  {
    // path: 'signup', loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule)
    path: 'signup',
    component: SignupComponent,
  },
  {
    // path: 'pass-reset', loadChildren: () => import('./auth/pass-reset/pass-reset.module').then(m => m.PassResetModule)
    path: 'pass-reset',
    component: PasswordResetComponent,
  },
  {
    // path: 'pass-create', loadChildren: () => import('./auth/pass-create/pass-create.module').then(m => m.PassCreateModule)
    path: 'pass-create',
    component: PasswordCreateComponent,
  },
  // {
  //   path: 'lockscreen', loadChildren: () => import('./auth/lockscreen/lockscreen.module').then(m => m.LockscreenModule)
  // },
  {
    // path: 'logout', loadChildren: () => import('./auth/logout/logout.module').then(m => m.LogoutModule)
    path: 'logout',
    component: LogoutComponent,
  },
  {
    // path: 'success-msg',
    // loadChildren: () =>
    //   import('./auth/success-msg/success-msg.module').then(
    //     (m) => m.SuccessMsgModule
    //   ),
    path: 'success-msg',
    component: SuccessMsgComponent
  },
  // {
  //   path: 'twostep',
  //   loadChildren: () =>
  //     import('./auth/twostep/twostep.module').then((m) => m.TwostepModule),
  // },
  // {
  //   path: 'errors',
  //   loadChildren: () =>
  //     import('./auth/errors/errors.module').then((m) => m.ErrorsModule),
  // },
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
