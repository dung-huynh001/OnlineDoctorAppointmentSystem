import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentOnSiteComponent } from './appointment-on-site/appointment-on-site.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: 'appointment-on-site', component: AppointmentOnSiteComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent },
  {
    path: 'appointment',
    loadChildren: () =>
      import('./manage-appointment/manage-appointment.module').then((m) => m.ManageAppointmentModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule { }
