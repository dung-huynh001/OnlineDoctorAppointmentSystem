import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentOnSiteComponent } from './appointment-on-site/appointment-on-site.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';

const routes: Routes = [
  { path: 'appointment-on-site', component: AppointmentOnSiteComponent },
  { path: 'prescriptions', component: PrescriptionsComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DoctorRoutingModule { }
