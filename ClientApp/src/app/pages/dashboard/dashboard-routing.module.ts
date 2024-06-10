import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';

const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'doctor', component: DoctorDashboardComponent },
  { path: 'patient', component: PatientDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
