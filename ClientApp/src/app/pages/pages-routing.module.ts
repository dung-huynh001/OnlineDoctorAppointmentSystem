import { ScheduleOfDoctorsComponent } from './schedule-of-doctors/schedule-of-doctors.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { CustomerCareComponent } from './customer-care/customer-care.component';
import { MedicalProcessComponent } from './medical-process/medical-process.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AssignScheduleComponent } from './assign-schedule/assign-schedule.component';
import { DepartmentManagementComponent } from './department-management/department-management.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'make-appointment',
    component: MakeAppointmentComponent,
  },
  {
    path: 'appointment-management',
    loadChildren: () =>
      import('./appointment-management/appointment-management.module').then(
        (m) => m.AppointmentManagementModule
      ),
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
    path: 'department',
    component: DepartmentManagementComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
