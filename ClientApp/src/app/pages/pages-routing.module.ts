import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { MedicalProcessComponent } from './medical-process/medical-process.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AssignScheduleComponent } from './assign-schedule/assign-schedule.component';
import { SchedulerComponent } from './scheduler/scheduler.component';

const currentUser: any = JSON.parse(
  localStorage.getItem('currentUser')!
) as object;

var redirectToDashboard = 'patient/dashboard';

if (currentUser) {
  switch (currentUser.userType) {
    case 'admin':
      redirectToDashboard = 'admin/dashboard';
      break;
    case 'doctor':
      redirectToDashboard = 'doctor/dashboard';
      break;
    default:
      redirectToDashboard = 'patient/dashboard';
      break;
  }
}

const routes: Routes = [
  {
    path: 'help',
    redirectTo: 'pages/coming-soon',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: redirectToDashboard,
  },
  {
    path: 'medical-process',
    component: MedicalProcessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'assign-schedule',
    component: AssignScheduleComponent,
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./edit-profile/edit-profile.module').then(
        (m) => m.EditProfileModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./patient/patient.module').then((m) => m.PatientModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./doctor/doctor.module').then((m) => m.DoctorModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'scheduler',
    loadChildren: () =>
      import('./scheduler/scheduler.module').then((m) => m.SchedulerModule),
    component: SchedulerComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
