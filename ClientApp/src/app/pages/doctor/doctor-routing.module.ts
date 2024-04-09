import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentOnSiteComponent } from './appointment-on-site/appointment-on-site.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'appointment-on-site', component: AppointmentOnSiteComponent },
  { path: 'prescriptions', component: PrescriptionsComponent },
  { path: 'dashboard', component: DashboardComponent },
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
