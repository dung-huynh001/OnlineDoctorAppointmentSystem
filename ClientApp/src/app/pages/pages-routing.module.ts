import { ScheduleOfDoctorsComponent } from './schedule-of-doctors/schedule-of-doctors.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { CustomerCareComponent } from './customer-care/customer-care.component';
import { MedicalProcessComponent } from './medical-process/medical-process.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AssignScheduleComponent } from './assign-schedule/assign-schedule.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'help',
    redirectTo: 'pages/coming-soon',
  },
  {
    path: 'medical-process',
    component: MedicalProcessComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'schedule-of-doctors',
    component: ScheduleOfDoctorsComponent,
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
      import('./edit-profile/edit-profile.module').then((m) => m.EditProfileModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then((m) => m.PatientModule),
  },
  {
    path: 'doctor',
    loadChildren: () => import('./doctor/doctor.module').then((m) => m.DoctorModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
