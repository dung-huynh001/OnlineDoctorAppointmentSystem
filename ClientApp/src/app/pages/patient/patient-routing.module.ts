import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleOfDoctorComponent } from './schedule-of-doctor/schedule-of-doctor.component';

const routes: Routes = [
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then((m) => m.AppointmentModule)
  },
  {
    path: 'make-appointment',
    component: MakeAppointmentComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'edit-profile/:id',
    component: EditProfileComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'schedule-of-doctors',
    component: ScheduleOfDoctorComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
