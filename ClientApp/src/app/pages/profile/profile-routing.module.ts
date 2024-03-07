import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'patient', component: PatientComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
